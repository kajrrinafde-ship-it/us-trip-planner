#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
//  sync-notion.js — Fetch trip notes from a Notion PAGE and generate trip-data.json
//  Usage: npm run sync
//
//  Your Notion page can have any structure. The script reads:
//  - Headings → become section labels
//  - Bullet lists → become bucket list items
//  - Text after headings → notes
// ─────────────────────────────────────────────────────────────────────────────

require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const PAGE_ID = process.env.NOTION_PAGE_ID;
const OUTPUT_PATH = path.join(__dirname, 'trip-data.json');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function richTextToPlain(richTextArray) {
    if (!richTextArray) return '';
    return richTextArray.map(t => t.plain_text).join('');
}

// Try to assign an emoji icon based on keywords
function guessIcon(text) {
    const t = text.toLowerCase();
    if (t.includes('gun') || t.includes('shoot') || t.includes('range')) return '🔫';
    if (t.includes('crocodile') || t.includes('alligator')) return '🐊';
    if (t.includes('bacon') || t.includes('milkshake')) return '🥓';
    if (t.includes('kitesurf') || t.includes('surf') || t.includes('sup')) return '🏄';
    if (t.includes('cheesesteak') || t.includes('cheese')) return '🧀';
    if (t.includes('pizza') || t.includes('deep')) return '🍕';
    if (t.includes('mountain bik') || t.includes('trail') || t.includes('bike')) return '🚵';
    if (t.includes('lobster')) return '🦞';
    if (t.includes('party') || t.includes('club') || t.includes('night')) return '🎉';
    if (t.includes('music') || t.includes('festival') || t.includes('concert')) return '🎵';
    if (t.includes('chimichanga') || t.includes('burrito') || t.includes('taco')) return '🌯';
    if (t.includes('sushi') || t.includes('benihana') || t.includes('japanese')) return '🍣';
    if (t.includes('climb') || t.includes('boulder')) return '🧗';
    if (t.includes('hike') || t.includes('hiking')) return '🥾';
    if (t.includes('food') || t.includes('eat') || t.includes('restaurant')) return '🍽️';
    if (t.includes('beer') || t.includes('bar') || t.includes('drink')) return '🍺';
    if (t.includes('beach') || t.includes('ocean') || t.includes('swim')) return '🏖️';
    if (t.includes('camp') || t.includes('tent')) return '⛺';
    if (t.includes('museum') || t.includes('art') || t.includes('gallery')) return '🎨';
    if (t.includes('drive') || t.includes('road trip') || t.includes('car')) return '🚗';
    if (t.includes('fly') || t.includes('flight')) return '✈️';
    if (t.includes('shop') || t.includes('buy') || t.includes('store')) return '🛍️';
    if (t.includes('photo') || t.includes('picture') || t.includes('view')) return '📸';
    return '⭐';
}

// Try to guess which city/location an item relates to
function guessLocation(text) {
    const t = text.toLowerCase();
    if (t.includes('miami')) return 'Miami';
    if (t.includes('golden gate') || t.includes('san francisco') || t.includes('sf')) return 'San Francisco';
    if (t.includes('philly') || t.includes('philadelphia')) return 'Philadelphia';
    if (t.includes('chicago')) return 'Chicago';
    if (t.includes('la') || t.includes('los angeles') || t.includes('hollywood')) return 'Los Angeles';
    if (t.includes('new york') || t.includes('nyc') || t.includes('manhattan')) return 'New York';
    if (t.includes('austin') || t.includes('dallas') || t.includes('texas')) return 'Texas';
    if (t.includes('seattle') || t.includes('washington')) return 'Seattle';
    if (t.includes('portland') || t.includes('oregon')) return 'Portland';
    return null;
}

// ─── Read all blocks from page (handles pagination) ──────────────────────────

async function getAllBlocks(blockId) {
    const allBlocks = [];
    let cursor;
    do {
        const response = await notion.blocks.children.list({
            block_id: blockId,
            start_cursor: cursor,
            page_size: 100
        });
        allBlocks.push(...response.results);
        cursor = response.has_more ? response.next_cursor : undefined;
    } while (cursor);
    return allBlocks;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
    console.log('🔄 Reading Notion page...\n');

    const blocks = await getAllBlocks(PAGE_ID);

    let currentSection = null;
    const sections = {};     // { sectionName: [items] }
    const allItems = [];

    for (const block of blocks) {
        const type = block.type;

        // Headings → new section
        if (type === 'heading_1' || type === 'heading_2' || type === 'heading_3') {
            const text = richTextToPlain(block[type].rich_text).trim();
            if (text) {
                currentSection = text;
                if (!sections[currentSection]) sections[currentSection] = [];
            }
            continue;
        }

        // Bullet / numbered / to-do list items → bucket list items
        if (type === 'bulleted_list_item' || type === 'numbered_list_item' || type === 'to_do') {
            const text = richTextToPlain(block[type].rich_text).trim();
            if (!text) continue;

            const item = {
                text,
                icon: guessIcon(text),
                location: guessLocation(text),
                section: currentSection,
                checked: type === 'to_do' ? (block.to_do.checked || false) : false
            };

            allItems.push(item);
            if (currentSection && sections[currentSection]) {
                sections[currentSection].push(item);
            }
            continue;
        }

        // Plain paragraphs → could be notes or standalone items
        if (type === 'paragraph') {
            const text = richTextToPlain(block.paragraph.rich_text).trim();
            if (!text) continue;

            // If it looks like a list item (short text, no period at end), treat as bucket item
            if (text.length < 80 && !text.endsWith('.') && !text.startsWith('http')) {
                const item = {
                    text,
                    icon: guessIcon(text),
                    location: guessLocation(text),
                    section: currentSection,
                    checked: false
                };
                allItems.push(item);
                if (currentSection && sections[currentSection]) {
                    sections[currentSection].push(item);
                }
            }
        }
    }

    // Build output
    const output = {
        lastSync: new Date().toISOString(),
        bucketList: allItems,
        sections
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf8');

    console.log(`✅ Synced ${allItems.length} items from Notion\n`);
    allItems.forEach(item => {
        const loc = item.location ? ` (${item.location})` : '';
        const check = item.checked ? '✓' : '○';
        console.log(`   ${check} ${item.icon}  ${item.text}${loc}`);
    });
    console.log(`\n📄 Written to trip-data.json`);
    console.log(`   Last sync: ${output.lastSync}`);
}

main().catch(err => {
    console.error('❌ Sync failed:', err.message);
    if (err.code === 'unauthorized') {
        console.error('   → Check your NOTION_API_KEY in .env');
    } else if (err.code === 'object_not_found') {
        console.error('   → Check your NOTION_PAGE_ID in .env');
        console.error('   → Make sure you shared the page with your integration');
    }
    process.exit(1);
});
