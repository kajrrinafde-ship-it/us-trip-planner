/* ========================================
   US Trip Planner - Interactive Map JS
   ======================================== */

// ─── Location Data (Rich Activity Cards) ─────────────────────────────────
// This is fallback data. If trip-data.json exists (synced from Notion), it takes priority.

let locations = [
    {
        id: 'california-utah',
        name: 'California / Utah',
        type: 'trip',
        dates: 'Mar 13–16',
        x: 275, y: 275,
        supSpot: true,
        atSection: null,
        items: [
            { icon: '✈️', label: 'Flight to LA', cost: '₹0 (covered)', type: 'logistics' },
            {
                icon: '🚗', label: 'LAX → Joshua Tree: Rental Car (Best)',
                detail: "~2.5 hrs via I-10 E. Most flexible — you'll need a car in the park anyway. Avoid LA rush hour. Carry offline maps, no signal in the park.",
                cost: '₹2,500–4,000/day (rental + gas ~₹800)',
                link: 'https://www.kayak.com/cars/Los-Angeles,California,United-States-c1596/2026-03-05/2026-03-15',
                type: 'logistics'
            },
            {
                icon: '🚌', label: 'LAX → Joshua Tree: Bus + Taxi',
                detail: 'Budget option: FlyAway bus to Union Station → Greyhound/FlixBus to Palm Springs → taxi/Uber to Joshua Tree (~₹2,000 total). ~5 hrs, multiple transfers.',
                cost: '₹2,000–3,500',
                link: 'https://www.flixbus.com/',
                type: 'logistics'
            },
            {
                icon: '🚆', label: 'LAX → Joshua Tree: Amtrak Train',
                detail: 'LA Union Station → Palm Springs via Amtrak, then taxi/Uber to JT. Scenic & relaxed. ~3 hrs total.',
                cost: '₹3,000–5,000 (train + taxi)',
                link: 'https://www.amtrak.com/',
                type: 'logistics'
            },
            { icon: '🏠', label: 'Accommodation (10 nights)', cost: '₹15,000', detail: 'Hostel in Joshua Tree / Airbnb near Bishop', type: 'logistics' },
            {
                icon: '🧗', label: 'Rock Climbing — Joshua Tree',
                detail: 'World-class outdoor bouldering & sport climbing. Hidden Valley, Intersection Rock, Barker Dam area.',
                cost: '₹2,000 (gear rental)',
                image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&h=200&fit=crop',
                link: 'https://www.nps.gov/jotr/planyourvisit/climbing.htm',
                type: 'activity'
            },
            {
                icon: '🧗', label: 'Rock Climbing — Bishop Buttermilks',
                detail: 'Legendary bouldering area with the Mandala, Buttermilker, and Grandma Peabody.',
                cost: '₹500 (crashpad rental)',
                image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=400&h=200&fit=crop',
                link: 'https://www.mountainproject.com/area/105835782/the-buttermilks',
                type: 'activity'
            },
            {
                icon: '🏄', label: 'SUP — Malibu / Santa Cruz',
                detail: 'Stand-up paddle along the California coast. Calm mornings are best. 🌿 Weed is legal — smoke and float.',
                cost: '₹1,500 (board rental)',
                image: 'https://images.unsplash.com/photo-1526188717906-ab4a2f949f48?w=400&h=200&fit=crop',
                link: 'https://goo.gl/maps/malibu',
                type: 'activity'
            },
            {
                icon: '🏜️', label: 'Utah Canyon Country',
                detail: 'Zion narrows, Bryce Canyon hoodoos, or Moab red rock. March weather is perfect.',
                cost: '₹1,500 (park fees + gas)',
                image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=200&fit=crop',
                link: 'https://www.nps.gov/zion/',
                type: 'activity'
            },
            {
                icon: '🪁', label: 'Kitesurf under Golden Gate Bridge',
                detail: 'From Ashvin\'s list! Kitesurfing with the Golden Gate as your backdrop. Crissy Field is the launch spot.',
                cost: '₹3,000 (lesson + rental)',
                type: 'activity'
            },
            {
                icon: '🎵', label: 'Music Festival',
                detail: 'From Ashvin\'s list! Check what festivals are on in March — SXSW is in Austin, but LA always has something.',
                cost: 'TBD',
                type: 'activity'
            }
        ],
        food: [
            { name: 'In-N-Out Burger', note: 'California classic. Animal style fries. ~₹500', link: 'https://www.in-n-out.com/' },
            { name: 'Taco trucks (LA)', note: 'Best tacos outside Mexico. Try Mariscos Jalisco. ~₹300', link: 'https://goo.gl/maps/jalisco' },
            { name: 'Schat\'s Bakery (Bishop)', note: 'Famous sheepherder bread. Stop after climbing. ~₹400', link: 'https://goo.gl/maps/schats' }
        ],
        notes: 'First leg! Climbing in Joshua Tree & Bishop, SUP along the coast. Weed is fully legal in CA.'
    },
    {
        id: 'atlanta',
        name: 'Atlanta, GA',
        type: 'work',
        dates: 'Mar 16–20',
        x: 675, y: 345,
        supSpot: false,
        atSection: 'Springer Mountain — Southern terminus of the AT. Day hike to summit (8.8 mi roundtrip via Approach Trail). Start point for all northbound thru-hikers.',
        items: [
            { icon: '💼', label: 'Work Week', cost: '₹0 (covered)', detail: 'Accommodation & basics covered by work', type: 'logistics' },
            {
                icon: '🎨', label: 'High Museum of Art',
                detail: 'Premier art museum in the Southeast. Richard Meier–designed building. Collections from Renaissance to contemporary.',
                cost: '₹1,500 (entry)',
                image: 'https://images.unsplash.com/photo-1594970596398-0f0f1849c5a2?w=400&h=200&fit=crop',
                link: 'https://high.org/',
                type: 'activity'
            },
            {
                icon: '🥾', label: 'Springer Mountain (AT Terminus)',
                detail: '1.5hr drive north. The southern starting point of the 2,190-mile Appalachian Trail. 8.8-mile roundtrip day hike.',
                cost: '₹800 (gas + parking)',
                image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=200&fit=crop',
                link: 'https://www.alltrails.com/trail/us/georgia/springer-mountain-via-approach-trail',
                type: 'activity'
            },
            {
                icon: '🌳', label: 'Piedmont Park & BeltLine',
                detail: 'Walk the Atlanta BeltLine after work — a 22-mile loop of trails, art, and food stalls.',
                cost: 'Free',
                image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=200&fit=crop',
                link: 'https://beltline.org/',
                type: 'activity'
            }
        ],
        food: [
            { name: 'Fox Bros. Bar-B-Q', note: 'Best pulled pork in Atlanta. Massive portions. ~₹800', link: 'https://foxbrosbbq.com/' },
            { name: 'Ponce City Market', note: 'Food hall with 20+ vendors. Rooftop has skyline views. ~₹600', link: 'https://poncecitymarket.com/' },
            { name: 'Waffle House', note: 'Open 24/7 — it\'s an Atlanta institution. Get scattered & smothered. ~₹300', link: 'https://www.wafflehouse.com/' }
        ],
        notes: 'Work week base. High Museum is a must. Springer Mountain is an easy weekend day trip.'
    },
    {
        id: 'chicago',
        name: 'Chicago, IL',
        type: 'work',
        dates: 'Mar 17+',
        x: 570, y: 145,
        supSpot: true,
        atSection: null,
        items: [
            { icon: '💼', label: 'Work', cost: '₹0 (covered)', type: 'logistics' },
            {
                icon: '🍀', label: 'St. Patrick\'s Day (Mar 17)',
                detail: 'They dye the Chicago River GREEN. Massive parade on Columbus Drive. Legendary pub crawls.',
                cost: '₹2,000 (drinks & food)',
                image: 'https://images.unsplash.com/photo-1521128110220-2742a498baaf?w=400&h=200&fit=crop',
                link: 'https://chicagostpatricksdayparade.org/',
                type: 'activity'
            },
            {
                icon: '🏙️', label: 'Architecture Boat Tour',
                detail: 'Chicago Architecture Center river cruise. 90 mins through downtown. Best way to see the skyline.',
                cost: '₹3,500',
                image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=200&fit=crop',
                link: 'https://www.architecture.org/tours/detail/chicago-architecture-foundation-center-river-cruise-aboard-chicagos-first-lady/',
                type: 'activity'
            },
            {
                icon: '🏄', label: 'SUP — Lake Michigan',
                detail: 'Paddle along the Chicago waterfront. Ohio Street Beach launch. 🌿 Weed is legal in Illinois.',
                cost: '₹1,500 (rental)',
                image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=200&fit=crop',
                link: 'https://goo.gl/maps/chicagosup',
                type: 'activity'
            },
            {
                icon: '🎵', label: 'Live Blues / Jazz',
                detail: 'Kingston Mines or Buddy Guy\'s Legends. Chicago is the birthplace of electric blues.',
                cost: '₹1,500 (cover + drinks)',
                image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=200&fit=crop',
                link: 'https://kingstonmines.com/',
                type: 'activity'
            }
        ],
        food: [
            { name: 'Deep Dish Pizza (Lou Malnati\'s)', note: '🔥 From Ashvin\'s list! THE Chicago food. Buttery crust, chunky tomato sauce. ~₹900', link: 'https://www.loumalnatis.com/' },
            { name: 'Italian Beef (Al\'s #1)', note: 'Dipped, with hot giardiniera. Messy and perfect. ~₹500', link: 'https://www.alsbeef.com/' },
            { name: 'Garrett Popcorn', note: 'Chicago Mix (caramel + cheese). Buy a bag for the road. ~₹400', link: 'https://www.garrettpopcorn.com/' },
            { name: 'Benihana', note: '🔥 From Ashvin\'s list! Teppanyaki dinner — the onion volcano, fried rice toss, the whole show. ~₹2,000', link: 'https://www.benihana.com/' }
        ],
        notes: 'St. Patrick\'s in Chicago is legendary. Weed is legal. SUP on Lake Michigan is a vibe.'
    },
    {
        id: 'teton-range',
        name: 'Teton Range',
        type: 'wishlist',
        dates: 'Mar 20–22 (TBD)',
        x: 268, y: 155,
        supSpot: false,
        atSection: null,
        items: [
            { icon: '✈️', label: 'Flight to Jackson Hole', cost: '₹8,000 (est)', type: 'logistics' },
            { icon: '🏠', label: 'Accommodation (2 nights)', cost: '₹6,000', detail: 'Hostel or budget lodge near Jackson', type: 'logistics' },
            {
                icon: '🏔️', label: 'Grand Teton Viewpoints',
                detail: 'Drive Teton Park Road for jaw-dropping views. Schwabacher Landing at sunrise is iconic.',
                cost: '₹2,000 (park entry + gas)',
                image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=200&fit=crop',
                link: 'https://www.nps.gov/grte/',
                type: 'activity'
            },
            {
                icon: '🥾', label: 'Winter Hiking — Taggart Lake',
                detail: 'Moderate 6.4 mi trail. Snow-covered in March. Bring microspikes. Lake with Teton backdrop.',
                cost: 'Free (included in park fee)',
                image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=200&fit=crop',
                link: 'https://www.alltrails.com/trail/us/wyoming/taggart-lake-trail',
                type: 'activity'
            },
            {
                icon: '📸', label: 'Wildlife Safari',
                detail: 'Moose, elk, bison — especially on Moose-Wilson Road at dawn. Bring a telephoto lens.',
                cost: 'Free',
                image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400&h=200&fit=crop',
                link: 'https://www.nps.gov/grte/planyourvisit/wildlife.htm',
                type: 'activity'
            },
            {
                icon: '🚵', label: 'Trail Mountain Biking',
                detail: 'From Ashvin\'s list! Cache Creek or Game Creek trails near Jackson Hole. March may be snowy — check conditions.',
                cost: '₹1,500 (bike rental)',
                type: 'activity'
            }
        ],
        food: [
            { name: 'Persephone Bakery (Jackson)', note: 'Sourdough & pastries. Perfect before a hike. ~₹600', link: 'https://www.persephonebakery.com/' },
            { name: 'Snake River Brewing', note: 'Award-winning craft beer. Try the Zonker Stout. ~₹700', link: 'https://snakeriverbrewing.com/' }
        ],
        notes: 'March will have snow — stunning views but pack warm layers.'
    },
    {
        id: 'antelope-canyon',
        name: 'Antelope Canyon',
        type: 'wishlist',
        dates: 'Mar 22–24 (TBD)',
        x: 225, y: 290,
        supSpot: false,
        atSection: null,
        items: [
            { icon: '🏠', label: 'Accommodation (2 nights, Page AZ)', cost: '₹5,000', type: 'logistics' },
            {
                icon: '🏜️', label: 'Upper Antelope Canyon Tour',
                detail: 'Navajo-guided tour through the slot canyon. Light beams hit between 11am–1pm in March. BOOK IN ADVANCE.',
                cost: '₹4,000 (guided tour)',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop',
                link: 'https://www.antelopecanyon.com/',
                type: 'activity'
            },
            {
                icon: '🌄', label: 'Horseshoe Bend',
                detail: '1.5 mile roundtrip walk to a 1,000-ft drop overlooking the Colorado River. Sunset is magical.',
                cost: '₹800 (parking)',
                image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400&h=200&fit=crop',
                link: 'https://www.nps.gov/glca/planyourvisit/horseshoe-bend.htm',
                type: 'activity'
            },
            {
                icon: '🛶', label: 'Lake Powell Kayaking',
                detail: 'Rent a kayak and paddle into hidden side canyons. Crystal-clear turquoise water.',
                cost: '₹2,500 (rental)',
                image: 'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=400&h=200&fit=crop',
                link: 'https://www.nps.gov/glca/',
                type: 'activity'
            }
        ],
        food: [
            { name: 'Big John\'s Texas BBQ (Page)', note: 'Surprisingly great BBQ in the desert. Brisket plate. ~₹700', link: 'https://goo.gl/maps/bigjohns' },
            { name: 'Slackers (Page)', note: 'Burgers & craft beer with canyon vibes. ~₹600', link: 'https://goo.gl/maps/slackers' }
        ],
        notes: 'Book Antelope Canyon tours in advance — they fill up fast. Horseshoe Bend is a 10 min drive.'
    },
    {
        id: 'captiva-island',
        name: 'Captiva Island',
        type: 'wishlist',
        dates: 'Mar 24–26 (TBD)',
        x: 660, y: 435,
        supSpot: false,
        atSection: null,
        items: [
            { icon: '🏠', label: 'Accommodation (2 nights)', cost: '₹7,000', detail: 'Beach cottage or Airbnb', type: 'logistics' },
            {
                icon: '🏖️', label: 'Beach Day — Sanibel & Captiva',
                detail: 'White sand, warm Gulf water, world-famous shelling beaches. The "Sanibel Stoop" is real — everyone\'s picking shells.',
                cost: 'Free',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop',
                link: 'https://www.captivaisland.com/',
                type: 'activity'
            },
            {
                icon: '🏄', label: 'SUP — Pine Island Sound',
                detail: 'Calm, warm Gulf waters. Paddle through mangrove tunnels. Best at high tide.',
                cost: '₹1,500 (rental)',
                image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=400&h=200&fit=crop',
                link: 'https://goo.gl/maps/captiva-sup',
                type: 'activity'
            },
            {
                icon: '🌅', label: 'Sunset at South Seas',
                detail: 'The western tip of Captiva has the best sunsets in Florida. Bring a drink, sit on the sand.',
                cost: 'Free',
                image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=200&fit=crop',
                link: 'https://goo.gl/maps/southseas',
                type: 'activity'
            }
        ],
        food: [
            { name: 'The Bubble Room', note: 'Quirky, over-the-top restaurant. Giant cake slices. A must-visit. ~₹1,200', link: 'https://bubbleroomrestaurant.com/' },
            { name: 'The Mucky Duck', note: 'Beachfront seafood with sunset views. Grouper sandwich. ~₹1,000', link: 'https://www.muckyduck.com/' },
            { name: 'Crocodile Meat', note: '🔥 From Ashvin\'s list! Florida is gator country — find a place serving alligator bites or gator tacos in the area. ~₹800', link: null }
        ],
        notes: 'Stunning Gulf Coast island. Perfect for SUP. Florida is medical-only cannabis though.'
    },
    {
        id: 'san-juan-islands',
        name: 'San Juan Islands',
        type: 'wishlist',
        dates: 'Mar 26–28 (TBD)',
        x: 148, y: 68,
        supSpot: true,
        atSection: null,
        items: [
            { icon: '🚢', label: 'Ferry from Anacortes', cost: '₹2,000 (roundtrip)', detail: 'Washington State Ferries. ~1hr to Friday Harbor.', type: 'logistics' },
            { icon: '🏠', label: 'Accommodation (2 nights)', cost: '₹6,000', detail: 'Inn or Airbnb on San Juan Island', type: 'logistics' },
            {
                icon: '🐋', label: 'Whale Watching (Orca Season)',
                detail: 'March–May is the start of orca season. Southern Resident killer whales. 3-hour boat tour from Friday Harbor.',
                cost: '₹6,000 (boat tour)',
                image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=400&h=200&fit=crop',
                link: 'https://www.sanjuansafaris.com/',
                type: 'activity'
            },
            {
                icon: '🏄', label: 'SUP — Friday Harbor & Channels',
                detail: 'Paddle through kelp forests and around rocky islands. 🌿 Weed is fully legal in Washington — the dream combo.',
                cost: '₹1,500 (rental)',
                image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=200&fit=crop',
                link: 'https://goo.gl/maps/sji-sup',
                type: 'activity'
            },
            {
                icon: '🏝️', label: 'Lime Kiln Point State Park',
                detail: 'Best land-based whale-watching spot in the US. Also gorgeous at sunset.',
                cost: '₹200 (parking)',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
                link: 'https://parks.state.wa.us/540/Lime-Kiln-Point',
                type: 'activity'
            }
        ],
        food: [
            { name: 'Duck Soup (San Juan)', note: 'Farm-to-table, seasonal menu. Reservations recommended. ~₹1,500', link: 'https://ducksoupfridayharbor.com/' },
            { name: 'Friday Harbor Seafood', note: 'Fresh Dungeness crab and oysters right off the boat. ~₹800', link: 'https://goo.gl/maps/fhseafood' }
        ],
        notes: 'WA is weed-legal. SUP through the channels with orcas in the distance. THE dream spot.'
    },
    {
        id: 'new-york',
        name: 'New York',
        type: 'wishlist',
        dates: 'Mar 28–30 (TBD)',
        x: 748, y: 160,
        supSpot: true,
        atSection: 'Bear Mountain Section — Scenic AT section 1hr from NYC. The AT crosses the Hudson River here. Day hike to Perkins Memorial Tower for panoramic views.',
        items: [
            { icon: '🏠', label: 'Accommodation (2 nights)', cost: '₹8,000', detail: 'Hostel in Manhattan or Brooklyn Airbnb', type: 'logistics' },
            {
                icon: '🎨', label: 'MoMA & The Met',
                detail: 'Two of the world\'s greatest art museums. MoMA for modern (Starry Night, Warhol). The Met for everything else.',
                cost: '₹2,500 (combined entry)',
                image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=200&fit=crop',
                link: 'https://www.moma.org/',
                type: 'activity'
            },
            {
                icon: '🗽', label: 'Classic NYC Walk',
                detail: 'High Line → Chelsea Market → Central Park → Times Square. A full day of walking, free.',
                cost: 'Free',
                image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=200&fit=crop',
                link: 'https://www.thehighline.org/',
                type: 'activity'
            },
            {
                icon: '🥾', label: 'Bear Mountain (AT Section)',
                detail: '1hr north by train/car. AT crosses the Hudson here. Hike to Perkins Tower for panoramic views. 🌿 Weed is legal in NY.',
                cost: '₹1,500 (transport)',
                image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=200&fit=crop',
                link: 'https://www.alltrails.com/parks/us/new-york/bear-mountain-state-park',
                type: 'activity'
            },
            {
                icon: '🎵', label: 'Broadway Show',
                detail: 'Rush tickets or lottery for cheap seats. Hamilton, Wicked, or whatever\'s hot.',
                cost: '₹3,000–5,000',
                image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=200&fit=crop',
                link: 'https://www.broadway.com/',
                type: 'activity'
            }
        ],
        food: [
            { name: 'Joe\'s Pizza (Greenwich Village)', note: 'The quintessential NYC slice. Thin, floppy, perfect. ~₹300', link: 'https://www.joespizzanyc.com/' },
            { name: 'Halal Guys (53rd & 6th)', note: 'Legendary street cart. Chicken & gyro platter with white sauce. ~₹500', link: 'https://thehalalguys.com/' },
            { name: 'Los Tacos No. 1 (Chelsea Market)', note: 'Best tacos in NYC. Adobada is incredible. ~₹400', link: 'https://lostacos1.com/' },
            { name: 'Lobster Rolls', note: '🔥 From Ashvin\'s list! Luke\'s Lobster or Burger & Lobster. Cold Maine-style or warm Connecticut-style. ~₹1,200', link: 'https://lukeslobster.com/' }
        ],
        notes: 'NYC is expensive but worth it. Weed is legal. Bear Mountain AT section is just 1hr north.'
    },
    {
        id: 'dallas',
        name: 'Dallas, TX',
        type: 'wishlist',
        dates: 'Mar 30–31 (TBD)',
        x: 448, y: 340,
        supSpot: false,
        atSection: null,
        items: [
            { icon: '🏠', label: 'Accommodation (1 night)', cost: '₹4,000', type: 'logistics' },
            {
                icon: '🤠', label: 'Deep Ellum — Live Music & Street Art',
                detail: 'Dallas\'s artsy neighborhood. Murals on every wall. Live music venues, dive bars, galleries.',
                cost: '₹1,500 (cover + drinks)',
                image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop',
                link: 'https://deepellumtexas.com/',
                type: 'activity'
            },
            {
                icon: '🏛️', label: 'Dallas Museum of Art',
                detail: 'Free admission! Huge collection from ancient to contemporary. The Nasher Sculpture Center is next door.',
                cost: 'Free',
                image: 'https://images.unsplash.com/photo-1594970596398-0f0f1849c5a2?w=400&h=200&fit=crop',
                link: 'https://dma.org/',
                type: 'activity'
            },
            {
                icon: '🏟️', label: 'AT&T Stadium Tour',
                detail: 'Home of the Dallas Cowboys. Self-guided or VIP tour of the massive $1.3B stadium.',
                cost: '₹2,000 (tour)',
                image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=200&fit=crop',
                link: 'https://attstadium.com/tours/',
                type: 'activity'
            },
            {
                icon: '🔫', label: 'Fire a Gun at a Range',
                detail: 'From Ashvin\'s list! Texas is the place. Shoot rifles, pistols, even shotguns. No license needed for visitors.',
                cost: '₹3,000 (range fee + ammo)',
                type: 'activity'
            }
        ],
        food: [
            { name: 'Pecan Lodge (Deep Ellum)', note: 'Top-3 BBQ in Texas. Brisket, burnt ends, ribs. Be ready to wait. ~₹1,000', link: 'https://pecanlodge.com/' },
            { name: 'Velvet Taco', note: 'Creative tacos — try the Spicy Tikka Chicken. Late-night menu. ~₹500', link: 'https://www.velvettaco.com/' },
            { name: 'Whataburger', note: 'Texas fast food royalty. Honey butter chicken biscuit at 2am. ~₹300', link: 'https://www.whataburger.com/' },
            { name: 'Chimichanga', note: '🔥 From Ashvin\'s list! Deep-fried burrito perfection. Tex-Mex at its finest. ~₹500', link: null },
            { name: 'Bacon Milkshake', note: '🔥 From Ashvin\'s list! Try Jack in the Box or a local diner. Sweet + salty insanity. ~₹400', link: null }
        ],
        notes: 'Quick 1-2 day stop. Great food and culture. Weed is NOT legal in Texas.'
    },
    {
        id: 'pittsburgh',
        name: 'Pittsburgh',
        type: 'friend',
        dates: 'Flexible (stay with Nishant)',
        x: 675, y: 195,
        supSpot: false,
        atSection: 'Harpers Ferry Section (MD/WV border) — AT crosses the Potomac River. "Psychological midpoint" of the trail. ~4hr drive from Pittsburgh.',
        items: [
            { icon: '🏠', label: 'Stay with Nishant', cost: '₹0 (friend)', type: 'logistics' },
            {
                icon: '🌉', label: 'Mt. Washington & Incline',
                detail: 'Ride the Duquesne Incline to the overlook. One of the best city views in America — three rivers converging.',
                cost: '₹400 (incline ticket)',
                image: 'https://images.unsplash.com/photo-1569183602073-580599d7f1a0?w=400&h=200&fit=crop',
                link: 'https://www.duquesneincline.org/',
                type: 'activity'
            },
            {
                icon: '🎨', label: 'Andy Warhol Museum',
                detail: 'Seven floors dedicated to Warhol. Largest collection of his art. Pittsburgh was his hometown.',
                cost: '₹1,500 (entry)',
                image: 'https://images.unsplash.com/photo-1579541592065-da8a15e56e88?w=400&h=200&fit=crop',
                link: 'https://www.warhol.org/',
                type: 'activity'
            },
            {
                icon: '🥾', label: 'Harpers Ferry AT Section (Day Trip)',
                detail: '~4hr drive to the AT\'s psychological midpoint where it crosses the Potomac. Historic town + incredible hiking.',
                cost: '₹2,000 (gas + tolls)',
                image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=200&fit=crop',
                link: 'https://www.nps.gov/hafe/',
                type: 'activity'
            }
        ],
        food: [
            { name: 'Primanti Bros.', note: 'Pittsburgh\'s signature sandwich — fries and coleslaw INSIDE the sandwich. ~₹500', link: 'https://primantibros.com/' },
            { name: 'Pamela\'s Diner', note: 'Famous crepe-style pancakes. Cash only. Obama approved. ~₹400', link: 'https://pamelasdiner.com/' },
            { name: 'Philly Cheesesteak', note: '🔥 From Ashvin\'s list! Philly is ~5hrs from Pittsburgh. Day trip for a Pat\'s vs Geno\'s showdown. ~₹600', link: null }
        ],
        notes: 'Crash with Nishant! Pittsburgh has incredible views from Mt. Washington. Harpers Ferry is a doable day trip.'
    },
    {
        id: 'california-friends',
        name: 'California (Mercy & Moni)',
        type: 'friend',
        dates: 'Within Mar 13–16',
        x: 155, y: 315,
        supSpot: true,
        atSection: null,
        items: [
            { icon: '🏠', label: 'Stay with Mercy & Moni', cost: '₹0 (friend)', type: 'logistics' },
            {
                icon: '🧗', label: 'Climbing Gym Session',
                detail: 'Hit a local gym together — Sender One (LA) or Planet Granite (SF). Bouldering & lead.',
                cost: '₹1,200 (day pass + rental)',
                image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&h=200&fit=crop',
                link: 'https://www.senderoneclimbing.com/',
                type: 'activity'
            },
            {
                icon: '🏄', label: 'SUP with Friends',
                detail: 'Beach SUP session. 🌿 Legal weed + paddle + sunshine = peak California.',
                cost: '₹1,500 (rental)',
                image: 'https://images.unsplash.com/photo-1526188717906-ab4a2f949f48?w=400&h=200&fit=crop',
                link: 'https://goo.gl/maps/casup',
                type: 'activity'
            },
            {
                icon: '🌴', label: 'Beach Hangs & Sunset',
                detail: 'Venice Beach, Santa Monica, or wherever Mercy & Moni take you. Just vibes.',
                cost: 'Free',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop',
                link: 'https://goo.gl/maps/venice',
                type: 'activity'
            },
            {
                icon: '🎉', label: 'Party in LA',
                detail: 'From Ashvin\'s list! Hit up a rooftop bar or club with Mercy & Moni. Ask them for the best spots.',
                cost: '₹3,000 (drinks + cover)',
                type: 'activity'
            }
        ],
        food: [
            { name: 'Whatever Mercy & Moni recommend', note: 'Locals know best! Ask for their go-to spots.', link: null },
            { name: 'Açaí bowls on the beach', note: 'The California cliché that actually slaps. ~₹600', link: null }
        ],
        notes: 'Stay with Mercy & Moni. Climbing, SUP, legal weed — the ultimate friend+adventure combo.'
    }
];

// ─── US State paths (simplified) ─────────────────────────────────────────
const usStates = [
    { id: 'WA', d: 'M130,55 L185,55 L190,65 L195,110 L155,110 L142,105 L130,90 Z', name: 'Washington' },
    { id: 'OR', d: 'M130,90 L142,105 L155,110 L195,110 L195,160 L130,160 Z', name: 'Oregon' },
    { id: 'CA', d: 'M130,160 L195,160 L195,200 L210,260 L200,320 L175,340 L145,320 L125,280 L120,230 L130,160 Z', name: 'California' },
    { id: 'NV', d: 'M195,160 L240,160 L230,310 L195,200 Z', name: 'Nevada' },
    { id: 'ID', d: 'M195,110 L240,100 L260,140 L258,175 L240,160 L195,160 Z', name: 'Idaho' },
    { id: 'MT', d: 'M240,55 L360,55 L360,110 L300,110 L260,110 L240,100 Z', name: 'Montana' },
    { id: 'WY', d: 'M260,110 L360,110 L360,170 L258,175 Z', name: 'Wyoming' },
    { id: 'UT', d: 'M240,160 L258,175 L360,170 L360,220 L310,220 L310,265 L240,265 L230,310 Z', name: 'Utah' },
    { id: 'CO', d: 'M310,220 L360,220 L420,220 L420,280 L310,280 L310,265 Z', name: 'Colorado' },
    { id: 'AZ', d: 'M195,280 L240,265 L310,265 L310,280 L310,360 L260,380 L220,370 L195,340 Z', name: 'Arizona' },
    { id: 'NM', d: 'M310,280 L420,280 L420,380 L310,380 L310,360 Z', name: 'New Mexico' },
    { id: 'ND', d: 'M360,55 L480,55 L480,100 L360,100 Z', name: 'North Dakota' },
    { id: 'SD', d: 'M360,100 L480,100 L480,150 L360,150 Z', name: 'South Dakota' },
    { id: 'NE', d: 'M360,150 L480,150 L480,200 L360,200 Z', name: 'Nebraska' },
    { id: 'KS', d: 'M360,200 L480,200 L490,250 L420,250 L420,220 L360,220 Z', name: 'Kansas' },
    { id: 'OK', d: 'M420,280 L490,250 L520,260 L520,310 L420,310 Z', name: 'Oklahoma' },
    { id: 'TX', d: 'M370,310 L420,310 L520,310 L530,340 L520,400 L490,430 L450,440 L410,420 L370,380 L370,310 Z', name: 'Texas' },
    { id: 'MN', d: 'M480,55 L540,55 L550,80 L555,130 L480,130 L480,100 Z', name: 'Minnesota' },
    { id: 'IA', d: 'M480,130 L555,130 L560,190 L490,190 L480,150 Z', name: 'Iowa' },
    { id: 'MO', d: 'M490,190 L560,190 L570,210 L570,280 L520,280 L520,260 L490,250 Z', name: 'Missouri' },
    { id: 'AR', d: 'M520,280 L570,280 L580,310 L575,340 L520,340 L520,310 Z', name: 'Arkansas' },
    { id: 'LA', d: 'M520,340 L575,340 L585,380 L580,410 L540,400 L520,400 Z', name: 'Louisiana' },
    { id: 'WI', d: 'M540,55 L580,55 L590,70 L590,130 L555,130 L550,80 Z', name: 'Wisconsin' },
    { id: 'IL', d: 'M560,130 L590,130 L595,200 L570,210 L560,190 Z', name: 'Illinois' },
    { id: 'MI', d: 'M590,55 L630,55 L640,80 L635,130 L600,150 L590,130 L590,70 Z', name: 'Michigan' },
    { id: 'IN', d: 'M595,140 L620,140 L625,210 L595,200 Z', name: 'Indiana' },
    { id: 'OH', d: 'M620,140 L665,140 L665,210 L625,210 Z', name: 'Ohio' },
    { id: 'MS', d: 'M575,310 L580,310 L610,310 L610,390 L585,400 L580,410 L575,340 Z', name: 'Mississippi' },
    { id: 'AL', d: 'M610,310 L650,310 L655,390 L630,405 L610,400 L610,390 Z', name: 'Alabama' },
    { id: 'TN', d: 'M570,280 L680,270 L680,300 L610,310 L580,310 Z', name: 'Tennessee' },
    { id: 'KY', d: 'M570,230 L680,230 L685,260 L680,270 L570,280 Z', name: 'Kentucky' },
    { id: 'GA', d: 'M650,310 L700,310 L710,380 L670,400 L655,390 Z', name: 'Georgia' },
    { id: 'FL', d: 'M650,390 L710,380 L720,400 L710,440 L680,470 L650,460 L640,420 L630,405 L650,390 Z', name: 'Florida' },
    { id: 'SC', d: 'M700,280 L730,280 L730,320 L700,310 Z', name: 'South Carolina' },
    { id: 'NC', d: 'M680,260 L750,250 L750,280 L730,280 L700,280 L680,270 Z', name: 'North Carolina' },
    { id: 'VA', d: 'M680,220 L750,215 L760,240 L750,250 L680,260 Z', name: 'Virginia' },
    { id: 'WV', d: 'M665,210 L695,210 L695,240 L680,240 L680,230 L670,230 Z', name: 'West Virginia' },
    { id: 'PA', d: 'M665,170 L740,170 L745,205 L695,210 L665,210 Z', name: 'Pennsylvania' },
    { id: 'NY', d: 'M700,110 L760,100 L765,145 L740,170 L700,170 L690,130 Z', name: 'New York' },
    { id: 'NJ', d: 'M740,170 L755,175 L752,210 L745,205 Z', name: 'New Jersey' },
    { id: 'MD', d: 'M695,210 L745,205 L750,215 L720,220 Z', name: 'Maryland' },
    { id: 'DE', d: 'M745,205 L752,200 L752,210 L750,215 Z', name: 'Delaware' },
    { id: 'CT', d: 'M760,145 L780,140 L782,158 L765,160 Z', name: 'Connecticut' },
    { id: 'RI', d: 'M782,150 L790,148 L790,160 L782,158 Z', name: 'Rhode Island' },
    { id: 'MA', d: 'M760,130 L795,128 L795,148 L780,140 L760,145 Z', name: 'Massachusetts' },
    { id: 'VT', d: 'M750,90 L760,88 L765,120 L755,120 Z', name: 'Vermont' },
    { id: 'NH', d: 'M760,80 L770,78 L775,120 L765,120 Z', name: 'New Hampshire' },
    { id: 'ME', d: 'M770,40 L800,35 L805,90 L775,100 L770,78 Z', name: 'Maine' },
];

// AT trail path and sections
const appalachianTrailPath = 'M655,350 L665,330 L670,310 L680,280 L690,260 L700,240 L695,225 L690,210 L695,200 L705,185 L720,170 L735,160 L745,150 L752,140 L758,130 L762,118 L768,105 L775,95 L780,80 L790,60';

const atSections = [
    { id: 'springer', name: 'Springer Mountain', path: 'M655,350 L660,340 L665,330', midX: 660, midY: 340, description: 'Southern terminus. Day hike from Amicalola Falls (8.8 mi).', nearCity: 'atlanta' },
    { id: 'smokies', name: 'Great Smoky Mtns', path: 'M665,295 L670,290 L675,283', midX: 670, midY: 290, description: 'Most popular AT section. Clingmans Dome (6,643 ft).', nearCity: 'atlanta' },
    { id: 'harpers-ferry', name: 'Harpers Ferry', path: 'M695,225 L698,218 L700,210', midX: 698, midY: 218, description: 'AT psychological midpoint. Crosses the Potomac. ~4hrs from Pittsburgh.', nearCity: 'pittsburgh' },
    { id: 'bear-mountain', name: 'Bear Mountain', path: 'M720,170 L728,165 L735,160', midX: 728, midY: 165, description: 'Scenic section 1hr from NYC. Perkins Tower panoramic views.', nearCity: 'new-york' }
];


// ─── SVG Map Rendering ──────────────────────────────────────────────────

function renderMap() {
    const svg = document.getElementById('usMap');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
    `;
    svg.appendChild(defs);

    // States
    const statesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    statesGroup.id = 'states';
    usStates.forEach(state => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', state.d);
        path.setAttribute('class', 'state-path');
        path.setAttribute('data-state', state.id);
        statesGroup.appendChild(path);
    });
    svg.appendChild(statesGroup);

    // ─── City markers (LA, Las Vegas) ────────────────────────────────────
    const citiesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    citiesGroup.id = 'city-markers';
    const cities = [
        { name: 'Los Angeles', short: 'LA', x: 155, y: 310 },
        { name: 'Las Vegas', short: 'LV', x: 218, y: 260 }
    ];
    cities.forEach(city => {
        const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const s = 5;
        diamond.setAttribute('points', `${city.x},${city.y - s} ${city.x + s},${city.y} ${city.x},${city.y + s} ${city.x - s},${city.y}`);
        diamond.setAttribute('class', 'city-marker');
        citiesGroup.appendChild(diamond);

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', city.x);
        label.setAttribute('y', city.y - 9);
        label.setAttribute('class', 'city-label');
        label.textContent = city.short;
        citiesGroup.appendChild(label);
    });
    svg.appendChild(citiesGroup);

    // ─── Climbing spot markers ───────────────────────────────────────────
    const climbGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    climbGroup.id = 'climb-markers';
    const climbSpots = [
        { name: 'Joshua Tree', x: 198, y: 300, distLA: '130mi / 2.5h', distLV: '200mi / 3h' },
        { name: 'Bishop', x: 175, y: 245, distLA: '270mi / 4.5h', distLV: '260mi / 4h' },
        { name: 'Red Rocks', x: 220, y: 255, distLA: '270mi / 4h', distLV: '20mi / 30min' }
    ];
    climbSpots.forEach(spot => {
        // Triangle marker
        const tri = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const s = 4;
        tri.setAttribute('points', `${spot.x},${spot.y - s} ${spot.x + s},${spot.y + s} ${spot.x - s},${spot.y + s}`);
        tri.setAttribute('class', 'climb-marker');
        climbGroup.appendChild(tri);

        // Spot name
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', spot.x);
        label.setAttribute('y', spot.y - 7);
        label.setAttribute('class', 'climb-label');
        label.textContent = '🧗 ' + spot.name;
        climbGroup.appendChild(label);

        // Distance info
        const dist = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        dist.setAttribute('x', spot.x);
        dist.setAttribute('y', spot.y + s + 8);
        dist.setAttribute('class', 'climb-distance');
        dist.textContent = `LA: ${spot.distLA}  •  LV: ${spot.distLV}`;
        climbGroup.appendChild(dist);
    });
    svg.appendChild(climbGroup);

    // Appalachian Trail
    const atGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    atGroup.id = 'appalachian-trail';
    const trailPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    trailPath.setAttribute('d', appalachianTrailPath);
    trailPath.setAttribute('class', 'at-path');
    atGroup.appendChild(trailPath);

    atSections.forEach(section => {
        const sPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        sPath.setAttribute('d', section.path);
        sPath.setAttribute('class', 'at-section');
        sPath.addEventListener('click', () => {
            const loc = locations.find(l => l.id === section.nearCity);
            if (loc) showDetail(loc);
        });
        atGroup.appendChild(sPath);

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', section.midX + 10);
        label.setAttribute('y', section.midY);
        label.setAttribute('class', 'at-label');
        label.textContent = section.name;
        atGroup.appendChild(label);
    });
    svg.appendChild(atGroup);

    // Route line
    const routeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const tripStops = locations.filter(l => l.type === 'trip' || l.type === 'work');
    if (tripStops.length > 1) {
        let routeD = `M${tripStops[0].x},${tripStops[0].y}`;
        for (let i = 1; i < tripStops.length; i++) {
            const p = tripStops[i - 1], c = tripStops[i];
            const cpX = (p.x + c.x) / 2;
            const cpY = Math.min(p.y, c.y) - 30;
            routeD += ` Q${cpX},${cpY} ${c.x},${c.y}`;
        }
        const routeLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        routeLine.setAttribute('d', routeD);
        routeLine.setAttribute('class', 'route-line');
        routeGroup.appendChild(routeLine);
    }
    svg.appendChild(routeGroup);

    // Location pins
    const pinsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    pinsGroup.id = 'pins';

    locations.forEach(loc => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'map-pin');
        g.style.transformOrigin = `${loc.x}px ${loc.y}px`;

        let colorClass = 'pin-trip';
        if (loc.type === 'wishlist') colorClass = 'pin-wishlist';
        if (loc.type === 'friend') colorClass = 'pin-friend';
        if (loc.supSpot) colorClass = 'pin-sup';

        // Glow
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', loc.x);
        glow.setAttribute('cy', loc.y);
        glow.setAttribute('r', '12');
        glow.setAttribute('class', `pin-glow ${colorClass}`);
        glow.style.opacity = '0.3';
        g.appendChild(glow);

        // Circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', loc.x);
        circle.setAttribute('cy', loc.y);
        circle.setAttribute('r', '6');
        circle.setAttribute('class', `pin-circle ${colorClass}`);
        circle.setAttribute('stroke', 'rgba(0,0,0,0.4)');
        circle.setAttribute('stroke-width', '1.5');
        g.appendChild(circle);

        // Inner dot
        const inner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        inner.setAttribute('cx', loc.x);
        inner.setAttribute('cy', loc.y);
        inner.setAttribute('r', '2');
        inner.setAttribute('fill', 'rgba(255,255,255,0.8)');
        g.appendChild(inner);

        // Name label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', loc.x);
        label.setAttribute('y', loc.y - 14);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('class', 'pin-label');
        label.textContent = loc.name;
        g.appendChild(label);

        // Date sublabel
        const dateLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        dateLabel.setAttribute('x', loc.x);
        dateLabel.setAttribute('y', loc.y + 18);
        dateLabel.setAttribute('text-anchor', 'middle');
        dateLabel.setAttribute('class', 'pin-date-label');
        dateLabel.textContent = loc.dates;
        g.appendChild(dateLabel);

        // SUP+420 emoji
        if (loc.supSpot) {
            const sup = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            sup.setAttribute('x', loc.x + 14);
            sup.setAttribute('y', loc.y + 4);
            sup.setAttribute('class', 'pin-date-label');
            sup.setAttribute('fill', '#f472b6');
            sup.setAttribute('font-size', '7');
            sup.textContent = '🏄🌿';
            g.appendChild(sup);
        }

        g.addEventListener('click', () => showDetail(loc));
        pinsGroup.appendChild(g);
    });

    svg.appendChild(pinsGroup);
    document.getElementById('stat-places').textContent = locations.length;
}


// ─── Detail Panel ────────────────────────────────────────────────────────

function showDetail(loc) {
    const panel = document.getElementById('detailPanel');
    const overlay = document.getElementById('panelOverlay');

    // Badge
    const badge = document.getElementById('panelBadge');
    badge.textContent = getBadgeText(loc.type, loc.supSpot);
    badge.className = 'panel-badge';
    if (loc.type === 'wishlist') badge.classList.add('wishlist');
    if (loc.type === 'friend') badge.classList.add('friend');
    if (loc.supSpot) badge.classList.add('sup');
    if (loc.type === 'work') badge.classList.add('work');

    document.getElementById('panelTitle').textContent = loc.name;
    document.getElementById('panelDates').textContent = loc.dates;

    // Build items list (activities + logistics with inline costs)
    const itemsContainer = document.getElementById('panelItems');
    itemsContainer.innerHTML = '';

    loc.items.forEach(item => {
        const card = document.createElement('div');
        card.className = `item-card ${item.type}`;

        let html = '';

        // Image (only for activities)
        if (item.image) {
            html += `<div class="item-image"><img src="${item.image}" alt="${item.label}" loading="lazy" /></div>`;
        }

        html += `<div class="item-content">`;
        html += `<div class="item-header">`;
        html += `<span class="item-icon">${item.icon}</span>`;
        html += `<span class="item-name">${item.label}</span>`;
        if (item.cost) {
            html += `<span class="item-cost">${item.cost}</span>`;
        }
        html += `</div>`;

        if (item.detail) {
            html += `<p class="item-detail">${item.detail}</p>`;
        }

        if (item.link) {
            html += `<a href="${item.link}" target="_blank" rel="noopener" class="item-link">View details →</a>`;
        }

        html += `</div>`;
        card.innerHTML = html;
        itemsContainer.appendChild(card);
    });

    // Food section
    const foodContainer = document.getElementById('panelFood');
    const foodSection = document.getElementById('panelFoodSection');
    foodContainer.innerHTML = '';

    if (loc.food && loc.food.length) {
        foodSection.style.display = 'block';
        loc.food.forEach(f => {
            const foodCard = document.createElement('div');
            foodCard.className = 'food-card';
            let fHtml = `<span class="food-name">${f.name}</span>`;
            fHtml += `<span class="food-note">${f.note}</span>`;
            if (f.link) {
                fHtml += `<a href="${f.link}" target="_blank" rel="noopener" class="item-link">Map →</a>`;
            }
            foodCard.innerHTML = fHtml;
            foodContainer.appendChild(foodCard);
        });
    } else {
        foodSection.style.display = 'none';
    }

    // Notes
    const notesP = document.getElementById('panelNotes');
    const notesSection = document.getElementById('panelNotesSection');
    if (loc.notes) {
        notesSection.style.display = 'block';
        notesP.textContent = loc.notes;
    } else {
        notesSection.style.display = 'none';
    }

    // AT
    const atP = document.getElementById('panelAT');
    const atSec = document.getElementById('panelATSection');
    if (loc.atSection) {
        atSec.style.display = 'block';
        atP.textContent = loc.atSection;
    } else {
        atSec.style.display = 'none';
    }

    panel.classList.add('active');
    overlay.classList.add('active');
    panel.scrollTop = 0;
}

function closePanel() {
    document.getElementById('detailPanel').classList.remove('active');
    document.getElementById('panelOverlay').classList.remove('active');
}

function getBadgeText(type, supSpot) {
    if (supSpot) return '🏄 SUP + 🌿 420';
    switch (type) {
        case 'trip': return 'Trip Stop';
        case 'work': return 'Work Week';
        case 'wishlist': return 'Wishlist';
        case 'friend': return 'Friend Stay';
        default: return 'Stop';
    }
}

// ─── Flight Route Data ───────────────────────────────────────────────────

const outboundRoutes = [
    {
        id: 'direct-lax',
        title: 'Direct to LA',
        flag: '🇺🇸',
        badge: 'fastest',
        airlines: 'Air India / United',
        path: [
            { city: 'DEL/BOM', label: 'India' },
            { city: 'LAX', label: 'Los Angeles' }
        ],
        duration: '~17–19 hrs',
        cost: '₹0 (covered by work)',
        layover: 'None',
        notes: 'Simplest option. Air India flies DEL→LAX nonstop. United flies via SFO with short domestic connection.',
        pros: ['No visa hassle', 'Shortest total travel time', 'Direct flight available'],
        cons: ['No Europe detour', 'Long single flight'],
        recommended: false,
        bookLinks: [
            { label: 'Google Flights', url: 'https://www.google.com/travel/flights/search?tfs=CBwQAhooEgoyMDI2LTAzLTA1agwIAhIIL20vMDljMTdyDAgCEggvbS8wZHRkNBooEgoyMDI2LTAzLTMxagwIAhIIL20vMGR0ZDRyDAgCEggvbS8wOWMxNw&hl=en' },
            { label: 'Air India', url: 'https://www.airindia.com/' },
            { label: 'Skyscanner', url: 'https://www.skyscanner.co.in/transport/flights/del/lax/260305/?adultsv2=1' }
        ]
    },
    {
        id: 'via-amsterdam',
        title: 'Via Amsterdam (AMS)',
        flag: '🇳🇱',
        badge: 'cheapest',
        airlines: 'KLM / Delta (SkyTeam)',
        path: [
            { city: 'DEL/BOM', label: 'India' },
            { city: 'AMS', label: 'Amsterdam', layover: '2–6 hr layover' },
            { city: 'LAX / ORD', label: 'LA or Chicago' }
        ],
        duration: '~20–24 hrs total',
        cost: '₹0 (covered) — often cheapest routing',
        layover: '2–6 hours at Schiphol',
        notes: 'KLM/Delta codeshare. Schiphol is one of the best transit airports in the world. KLM via AMS is frequently the cheapest India→US option. Rijksmuseum Schiphol annex inside the airport is free! No transit visa needed with US visa.',
        pros: ['Break the long flight into 2 halves', 'World-class airport (free museum!)', 'No transit visa needed', 'Often the cheapest option'],
        cons: ['Longer total travel time', 'Need Schengen visa to leave airport'],
        recommended: true,
        bookLinks: [
            { label: 'Google Flights', url: 'https://www.google.com/travel/flights/search?tfs=CBwQAhoqEgoyMDI2LTAzLTA1agwIAhIIL20vMDljMTdyDAgCEggvbS8wZHRkNBIECAESABooEgoyMDI2LTAzLTMxagwIAhIIL20vMGR0ZDRyDAgCEggvbS8wOWMxNw&hl=en' },
            { label: 'KLM', url: 'https://www.klm.com/' },
            { label: 'Skyscanner', url: 'https://www.skyscanner.co.in/transport/flights/del/lax/260305/?adultsv2=1&stops=!direct' }
        ]
    },
    {
        id: 'via-stockholm',
        title: 'Via Stockholm (ARN)',
        flag: '🇸🇪',
        badge: null,
        airlines: 'SAS / Lufthansa (Star Alliance)',
        path: [
            { city: 'DEL', label: 'Delhi' },
            { city: 'ARN', label: 'Stockholm', layover: '2–5 hr layover' },
            { city: 'LAX / ORD / JFK', label: 'US destination' }
        ],
        duration: '~22–26 hrs total',
        cost: '₹0 (covered) — check availability',
        layover: '2–5 hours at Arlanda',
        notes: 'Less common route but works if you want Sweden. SAS flies Delhi→Stockholm, then connects to US. Arlanda is smaller and quieter than Schiphol. No transit visa needed with US visa, but overnight layovers may need Schengen visa.',
        pros: ['Unique routing', 'Quieter airport', 'No transit visa for daylight layover'],
        cons: ['Fewer flight options', 'May need Schengen visa for overnight', 'Slightly longer'],
        recommended: false,
        bookLinks: [
            { label: 'Google Flights', url: 'https://www.google.com/travel/flights/search?tfs=CBwQAhooEgoyMDI2LTAzLTA1agwIAhIIL20vMDljMTdyDAgCEggvbS8wZHRkNA&hl=en' },
            { label: 'SAS', url: 'https://www.flysas.com/' },
            { label: 'Skyscanner', url: 'https://www.skyscanner.co.in/transport/flights/del/lax/260305/?adultsv2=1' }
        ]
    }
];

const returnRoutes = [
    {
        id: 'return-direct',
        title: 'Direct from US',
        flag: '🇺🇸',
        badge: 'fastest',
        airlines: 'Air India / United',
        path: [
            { city: 'JFK / ORD', label: 'NYC or Chicago' },
            { city: 'DEL/BOM', label: 'India' }
        ],
        duration: '~15–17 hrs',
        cost: '₹0 (covered by work)',
        layover: 'None',
        notes: 'Easiest return. Nonstop options from JFK and ORD (Chicago). Book a JFK departure to get a final NYC day.',
        pros: ['Shortest return journey', 'No extra complexity'],
        cons: ['No Europe stopover'],
        recommended: false,
        bookLinks: [
            { label: 'Google Flights', url: 'https://www.google.com/travel/flights/search?tfs=CBwQAhooEgoyMDI2LTAzLTMxagwIAhIIL20vMGR0ZDRyDAgCEggvbS8wOWMxNw&hl=en' },
            { label: 'Air India', url: 'https://www.airindia.com/' },
            { label: 'Skyscanner', url: 'https://www.skyscanner.co.in/transport/flights/nyca/del/260331/?adultsv2=1' }
        ]
    },
    {
        id: 'return-amsterdam',
        title: 'Return via Amsterdam',
        flag: '🇳🇱',
        badge: 'cheapest',
        airlines: 'KLM / Delta',
        path: [
            { city: 'JFK / ORD', label: 'Your last US city' },
            { city: 'AMS', label: 'Amsterdam', layover: '3–8 hr layover' },
            { city: 'DEL/BOM', label: 'India' }
        ],
        duration: '~20–24 hrs total',
        cost: '₹0 (covered) — often cheapest',
        layover: '3–8 hours at Schiphol',
        notes: 'Same great Schiphol experience on the way back. KLM return via AMS is often the cheapest routing. Request a longer layover to enjoy the airport.',
        pros: ['Break the return journey', 'Schiphol lounges are excellent', 'Often cheapest routing'],
        cons: ['Longer total time'],
        recommended: true,
        bookLinks: [
            { label: 'Google Flights', url: 'https://www.google.com/travel/flights/search?tfs=CBwQAhooEgoyMDI2LTAzLTMxagwIAhIIL20vMGR0ZDRyDAgCEggvbS8wOWMxNw&hl=en' },
            { label: 'KLM', url: 'https://www.klm.com/' },
            { label: 'Skyscanner', url: 'https://www.skyscanner.co.in/transport/flights/nyca/del/260331/?adultsv2=1&stops=!direct' }
        ]
    },
    {
        id: 'return-stockholm',
        title: 'Return via Stockholm',
        flag: '🇸🇪',
        badge: null,
        airlines: 'SAS / Lufthansa',
        path: [
            { city: 'JFK / ORD', label: 'Your last US city' },
            { city: 'ARN', label: 'Stockholm', layover: '2–5 hr layover' },
            { city: 'DEL', label: 'Delhi' }
        ],
        duration: '~22–26 hrs total',
        cost: '₹0 (covered) — confirm with work',
        layover: '2–5 hours at Arlanda',
        notes: 'Works if SAS has good connections from your last US city. Arlanda has good Nordic food in the transit zone. Avoid overnight layovers unless you have a Schengen visa.',
        pros: ['Different route on return', 'Good Nordic food in transit'],
        cons: ['Fewer connections', 'Overnight = need Schengen visa'],
        recommended: false,
        bookLinks: [
            { label: 'Google Flights', url: 'https://www.google.com/travel/flights/search?tfs=CBwQAhooEgoyMDI2LTAzLTMxagwIAhIIL20vMGR0ZDRyDAgCEggvbS8wOWMxNw&hl=en' },
            { label: 'SAS', url: 'https://www.flysas.com/' },
            { label: 'Skyscanner', url: 'https://www.skyscanner.co.in/transport/flights/nyca/del/260331/?adultsv2=1' }
        ]
    }
];

const internalRoutes = [
    {
        id: 'internal-ca-atl',
        title: 'California → Atlanta',
        flag: '🇺🇸',
        badge: null,
        airlines: 'Delta / Southwest / Spirit',
        path: [
            { city: 'LAX / SFO', label: 'California' },
            { city: 'ATL', label: 'Atlanta' }
        ],
        duration: '~4–5 hrs',
        cost: '₹5,000–12,000 (~$60–150)',
        layover: 'Often nonstop',
        notes: 'Lots of options. Delta hub in ATL = cheap nonstop flights. Spirit/Frontier for ultra-budget (₹3,000–5,000 / $35–60 if booked early). Book early!',
        pros: ['Many nonstop options', 'Can be very cheap on budget airlines'],
        cons: ['Not covered by work', 'Baggage fees on budget airlines'],
        recommended: false,
        bookLinks: [
            { label: 'Google Flights', url: 'https://www.google.com/travel/flights/search?tfs=CBwQAhoeEgoyMDI2LTAzLTE1agcIARIDTEFYcgcIARIDQVRM&hl=en' },
            { label: 'Southwest', url: 'https://www.southwest.com/' },
            { label: 'Spirit', url: 'https://www.spirit.com/' }
        ]
    },
    {
        id: 'internal-atl-ord',
        title: 'Atlanta → Chicago',
        flag: '🇺🇸',
        badge: 'cheapest',
        airlines: 'Delta / United / Southwest',
        path: [
            { city: 'ATL', label: 'Atlanta' },
            { city: 'ORD / MDW', label: 'Chicago' }
        ],
        duration: '~2.5 hrs',
        cost: '₹4,000–10,000 (~$50–120)',
        layover: 'Nonstop available',
        notes: 'Short flight, many daily options. Southwest at Midway (MDW) can be cheapest (~₹3,500 / $40). Could also do Amtrak (~14hrs, ~₹4,000) if you want the scenic route.',
        pros: ['Short flight', 'Tons of daily flights', 'Amtrak option for scenic rail'],
        cons: ['Not covered by work'],
        recommended: false,
        bookLinks: [
            { label: 'Google Flights', url: 'https://www.google.com/travel/flights/search?tfs=CBwQAhoeEgoyMDI2LTAzLTIwagcIARIDQVRMcgcIARIDT1JE&hl=en' },
            { label: 'Southwest', url: 'https://www.southwest.com/' },
            { label: 'Amtrak', url: 'https://www.amtrak.com/routes/crescent-train.html' }
        ]
    },
    {
        id: 'internal-hub',
        title: 'Between Other Stops',
        flag: '🇺🇸',
        badge: null,
        airlines: 'Various',
        path: [
            { city: 'Any City', label: '' },
            { city: 'Any City', label: '' }
        ],
        duration: 'Varies',
        cost: '₹3,000–15,000 per leg',
        layover: 'Varies',
        notes: 'For wishlist destinations (Teton Range, Captiva, San Juan Islands etc.), check Google Flights for multi-city combos. Southwest doesn\'t show on Google Flights — check their site separately. Consider renting a car for nearby clusters.',
        pros: ['Flexible timing', 'Google Flights + Southwest covers everything'],
        cons: ['Adds up fast', 'Some places are better by car'],
        recommended: false,
        bookLinks: [
            { label: 'Google Flights', url: 'https://www.google.com/travel/flights' },
            { label: 'Southwest', url: 'https://www.southwest.com/' },
            { label: 'Skyscanner', url: 'https://www.skyscanner.co.in/' }
        ]
    }
];

function renderRouteCards(routes, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    routes.forEach((route, i) => {
        const card = document.createElement('div');
        card.className = `route-card${route.recommended ? ' recommended' : ''}`;
        card.style.animationDelay = `${i * 0.1}s`;

        let pathHtml = route.path.map((p, idx) => {
            let s = `<span class="city">${p.city}</span>`;
            if (p.layover) s += `<span class="layover">(${p.layover})</span>`;
            if (idx < route.path.length - 1) s += `<span class="arrow">→</span>`;
            return s;
        }).join(' ');

        let prosHtml = route.pros.map(p => `<span class="pro-tag">✓ ${p}</span>`).join('');
        let consHtml = route.cons.map(c => `<span class="con-tag">✗ ${c}</span>`).join('');

        // Badge HTML
        let badgeHtml = '';
        if (route.badge === 'fastest') badgeHtml = '<span class="route-badge fastest">⚡ FASTEST</span>';
        if (route.badge === 'cheapest') badgeHtml = '<span class="route-badge cheapest">💰 CHEAPEST</span>';

        // Book links HTML
        let bookHtml = '';
        if (route.bookLinks && route.bookLinks.length) {
            bookHtml = '<div class="route-book"><span class="book-label">Book:</span>' +
                route.bookLinks.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="book-link">${l.label}</a>`).join('') +
                '</div>';
        }

        card.innerHTML = `
            <div class="route-card-header">
                <span class="route-flag">${route.flag}</span>
                <div>
                    <div class="route-title">${route.title} ${badgeHtml}</div>
                    <div class="route-airline">${route.airlines}</div>
                </div>
            </div>
            <div class="route-path">${pathHtml}</div>
            <div class="route-details">
                <div class="route-detail"><span>Duration</span><span class="val">${route.duration}</span></div>
                <div class="route-detail"><span>Cost</span><span class="val">${route.cost}</span></div>
                <div class="route-detail"><span>Layover</span><span class="val">${route.layover}</span></div>
            </div>
            <div class="route-tags">${prosHtml}${consHtml}</div>
            <div class="route-note">${route.notes}</div>
            ${bookHtml}
        `;

        container.appendChild(card);
    });
}

// ─── Tab Switching ───────────────────────────────────────────────────────

function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const views = {
        map: document.getElementById('viewMap'),
        flights: document.getElementById('viewFlights')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const view = tab.dataset.view;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            Object.values(views).forEach(v => v.classList.remove('active'));
            views[view].classList.add('active');
        });
    });
}

// ─── Countdown ───────────────────────────────────────────────────────────

function initCountdown() {
    const tripDate = new Date('March 13, 2026 00:00:00').getTime();
    function update() {
        const dist = tripDate - Date.now();
        if (dist < 0) {
            document.getElementById('cd-days').textContent = '0';
            document.getElementById('cd-hours').textContent = '0';
            document.getElementById('cd-mins').textContent = '0';
            return;
        }
        document.getElementById('cd-days').textContent = Math.floor(dist / (1000 * 60 * 60 * 24));
        document.getElementById('cd-hours').textContent = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('cd-mins').textContent = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    }
    update();
    setInterval(update, 60000);
}

// ─── Notion Data Loader ──────────────────────────────────────────────────

async function loadLocations() {
    try {
        const res = await fetch('trip-data.json');
        if (!res.ok) throw new Error('No trip-data.json');
        const data = await res.json();
        if (data.locations && data.locations.length > 0) {
            locations = data.locations;
            console.log(`✅ Loaded ${locations.length} locations from Notion (synced ${data.lastSync})`);
        } else {
            console.log('ℹ️ trip-data.json has no locations, using built-in data');
        }
    } catch (e) {
        console.log('ℹ️ No trip-data.json found, using built-in data');
    }
}

// ─── Init ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
    await loadLocations();
    renderMap();
    initCountdown();
    initTabs();
    renderRouteCards(outboundRoutes, 'outboundRoutes');
    renderRouteCards(returnRoutes, 'returnRoutes');
    renderRouteCards(internalRoutes, 'internalRoutes');
    document.getElementById('panelClose').addEventListener('click', closePanel);
    document.getElementById('panelOverlay').addEventListener('click', closePanel);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
});
