      
// background.js

const gameUrlPattern   = "teamwood.itch.io/super-auto-pets";
const targetApiPattern = "/api/battle/get/";

const TAB = {};      // TAB[tabId] = true once we’ve attached
const SESSIONS = {}; // SESSIONS[sessionId] = { tabId } once Network is enabled

console.log("⏱️  [Background] loaded with Pet & Food Names");

// --- DATA MAPPINGS ---
const PET_MAP = {"0":"Ant","10":"Camel","100":"Tropical Fish","103":"Boar","104":"Dromedary","105":"Anteater","106":"Fox","107":"Panda","108":"Polar Bear","109":"Guinea Pig","11":"Cat","110":"Hamster","111":"Donkey","112":"Koala","113":"Duckling","114":"Lioness","115":"Velociraptor","116":"Orca","117":"Clownfish","118":"Piranha","119":"Sword Fish","12":"Caterpillar","120":"Eel","121":"Gold Fish","122":"Jellyfish","123":"Hammerhead Shark","124":"Komodo","125":"Ostrich","126":"Praying Mantis","127":"Hawk","128":"Seagull","129":"Pelican","13":"Chick","130":"Okapi","131":"Kiwi","132":"Atlantic Puffin","133":"Cassowary","134":"Shoebill","135":"Vulture","136":"Stork","137":"Frigatebird","138":"Hummingbird","139":"Frog","14":"Chicken","140":"Bear","141":"Moth","142":"Triceratops","143":"Spinosaurus","144":"Stegosaurus","145":"Pug","146":"Siberian Husky","147":"Iguana","148":"Sabertooth Tiger","149":"Pillbug","15":"Cow","150":"Blobfish","151":"Toucan","152":"Seahorse","153":"Starfish","154":"Capybara","155":"Zebra","156":"Woodpecker","157":"Orangutan","158":"Raccoon","159":"Platypus","16":"Crab","160":"Wasp","161":"Chinchilla","162":"Toad","163":"Yak","164":"Salamander","165":"Leech","166":"Armadillo","167":"Hyena","168":"Mole","169":"Porcupine","17":"Cricket","170":"Wolf","171":"Baboon","172":"Ferret","173":"Weasel","174":"Catfish","175":"Sealion","176":"Cuttlefish","177":"Squid","178":"Sting Ray","179":"Guinea Piglet","18":"Cockroach","180":"Anglerfish","181":"Bird of Paradise","182":"Beluga Whale","183":"Loyal Chinchilla","184":"Chipmunk","185":"Gazelle","186":"Highland Cow","187":"Opossum","188":"Golden Retriever","189":"Bulldog","19":"Crocodile","190":"Mantis Shrimp","191":"Sea Turtle","192":"Manatee","193":"Aardvark","194":"Alpaca","195":"Crow","196":"Dragonfly","197":"Emperor Tamarin","198":"Frilled Dragon","199":"Jerboa","2":"Badger","20":"Deer","200":"Lynx","201":"Lionfish","202":"Moose","203":"Meerkat","204":"Marmoset","205":"Reindeer","206":"White Tiger","207":"Wombat","208":"Tapir","209":"Walrus","21":"Dodo","210":"African Penguin","212":"Axolotl","213":"Beluga Sturgeon","214":"Betta Fish","215":"Black Necked Stilt","216":"Chameleon","217":"Cobra","218":"Cockatoo","219":"Crane","22":"Dog","220":"Door Head Ant","221":"Egyptian Vulture","222":"Elephant Seal","223":"Emu","224":"Falcon","225":"Flea","226":"Flying Fish","227":"Flying Squirrel","228":"Guineafowl","229":"Gecko","23":"Dolphin","230":"German Shepherd","231":"Gharial","232":"Goose","233":"Groundhog","234":"Hercules Beetle","235":"Hoopoe Bird","236":"Lemur","237":"Lizard","238":"Macaque","239":"Magpie","24":"Dove","240":"Manta Ray","241":"Mongoose","242":"Mosasaurus","245":"Musk Ox","246":"Nyala","247":"Osprey","248":"Oyster","249":"Pangolin","25":"Dragon","250":"Panther","251":"Pied Tamarin","252":"Poison Dart Frog","253":"Pteranodon","254":"Puma","255":"Robin","256":"Royal Flycatcher","257":"Saiga Antelope","258":"Sea Urchin","259":"Secretary Bird","26":"Duck","260":"Silkmoth","261":"Silver Fox","262":"Slug","263":"Stoat","264":"Surgeon Fish","265":"Vaquita","266":"Warthog","267":"Whale Shark","268":"Wildebeest","269":"Wolverine","27":"Eagle","270":"Smaller Slug","271":"Blue Ringed Octopus","272":"Cone Snail","273":"Doberman","274":"Fire Ant","275":"Grizzly Bear","276":"Nurse Shark","277":"Snapping Turtle","278":"Stonefish","28":"Elephant","282":"Lizard Tail","29":"Flamingo","3":"Beaver","30":"Fly","31":"Zombie Fly","32":"Fish","33":"Giraffe","34":"Goat","340":"Cockatrice","341":"Drop Bear","342":"Fairy","343":"Fire Pup","344":"Frost Wolf","345":"Gargoyle","346":"Ghost Kitten","348":"Griffin","349":"Brain Cramp","350":"Hippocampus","352":"Hydra","353":"Jackalope","354":"Kitsune","355":"Kraken","356":"Leviathan","357":"Mandrake","358":"Manticore","359":"Mimic","36":"Gorilla","360":"Minotaur","362":"Murmel","363":"Nessie","364":"Ouroboros","365":"Pegasus","366":"Phoenix","367":"Quetzalcoatl","368":"Red Dragon","369":"Roc","37":"Hedgehog","370":"Salmon of Knowledge","371":"Worm of Sand","372":"Sea Serpent","373":"Abomination","374":"Skeleton Dog","375":"Slime","376":"Sphinx","377":"Axehandle Hound","378":"Tree","379":"Tsuchinoko","38":"Hippo","380":"Unicorn","381":"Vampire Bat","382":"Warf","383":"Werewolf","384":"Monty","385":"Wyvern","386":"Visitor","387":"Yeti","39":"Horse","393":"Tahr","4":"Bee","40":"Kangaroo","405":"Mandrill","41":"Leopard","42":"Lion","44":"Llama","45":"Mammoth","46":"Monkey","47":"Mosquito","477":"Smallest Slug","48":"Mouse","5":"Bison","50":"Octopus","508":"Nest","51":"Otter","52":"Ox","53":"Parrot","54":"Peacock","55":"Rhino","551":"Hare","559":"Pigeon","56":"Penguin","57":"Rat","58":"Dirty Rat","59":"Pig","60":"Rabbit","601":"Bunyip","604":"Mothman","605":"Nightcrawler","606":"Sleipnir","607":"Tandgnost","608":"Tandgrisner","610":"Thunderbird","611":"Cuddle Toad","612":"Old Mouse","613":"Bad Dog","614":"Fake Nessie","616":"Questing Beast","617":"Sneaky Egg","619":"Pixiu","62":"Ram","621":"Barghest","622":"Rootling","623":"Lucky Cat","625":"Foo Dog","626":"Alchemedes","628":"Baku","63":"Rooster","630":"Cyclops","634":"Golden Beetle","635":"Mana Hound","636":"Team Spirit","638":"Rock","639":"Ogopogo","640":"Loveland Frogman","641":"Daycrawler","642":"Smaller Slime","643":"Hydra Head","644":"Giant Eyes Dog","646":"Young Phoenix","647":"Cracked Egg","648":"Chimera Goat","649":"Chimera Snake","65":"Scorpion","650":"Chimera Lion","651":"Deer Lord","652":"Jersey Devil","653":"Fur-Bearing Trout","654":"Tatzelwurm","655":"Kappa","656":"Boitata","657":"Nurikabe","658":"Good Dog","659":"Burbel","66":"Seal","67":"Shrimp","68":"Sheep","69":"Shark","7":"Blowfish","70":"Skunk","71":"Sloth","72":"Snail","73":"Snake","74":"Spider","75":"Squirrel","76":"Swan","77":"Tiger","78":"Tyrannosaurus","79":"Turkey","8":"Buffalo","80":"Turtle","81":"Whale","82":"Worm","85":"Bus","86":"Zombie Cricket","87":"Bat","88":"Beetle","89":"Bluebird","9":"Butterfly","91":"Hatching Chick","92":"Ladybug","93":"Lobster","94":"Microbe","95":"Owl","96":"Poodle","97":"Puppy","98":"Sauropod","99":"Tabby Cat"};
const FOOD_MAP = {"0":"Apple","1":"Bacon","2":"Banana","3":"Blueberry","4":"Carrot","5":"Chili","6":"Chocolate","7":"Coconut","8":"Cookie","9":"Croissant","10":"Cucumber","11":"Cupcake","12":"Garlic","13":"Grapes","14":"Honey","15":"Lasagna","16":"Lollipop","17":"Meat Bone","18":"Melon","19":"Milk","20":"Mushroom","21":"Orange","22":"Peach","23":"Peanut","24":"Pear","25":"Pepper","26":"Pizza","27":"Popcorn","28":"Pretzel","29":"Raspberry","30":"Salad Bowl","31":"Salt","32":"Shrimp (Food)","33":"Steak","34":"Strawberry","35":"Sushi","36":"Avocado","37":"Axe","38":"Ball","39":"Bed","40":"Canned Food","41":"Caramel","42":"Carrot Cake","43":"Cheese","44":"Cherries","45":"Chicken Leg","46":"Coffee","47":"Cotton Candy","48":"Donut","49":"Dumpling","50":"Egg","51":"Forbidden Fruit","52":"Fortune Cookie","53":"Fried Shrimp","54":"Hot Dog","55":"Ink","56":"Lemon","57":"Lettuce","58":"Lobster (Food)","59":"Lotus","60":"Medicine","61":"Nachos","62":"Onion","63":"Pineapple","64":"Potato","65":"Rice","66":"Skewer","67":"Spinach","68":"Stew","69":"Taco","70":"Tomato","71":"Waffle","72":"Doughnut","73":"Eggplant","74":"Pita Bread","75":"Celery","76":"Bell Pepper","77":"Broccoli","78":"Soft Ice","79":"Muffin","80":"Cheese Pizza"};

chrome.runtime.onInstalled.addListener(() => hookAlreadyOpenTabs());
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") maybeAttach(tab);
});
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
    try {
        const tab = await chrome.tabs.get(tabId);
        maybeAttach(tab);
    } catch (e) { /* Ignore error */ }
});

chrome.debugger.onEvent.addListener((src, method, params) => {
    const sid = src.sessionId ?? "top";
    if (!SESSIONS[sid]) return;

    if (method === "Network.responseReceived") {
        const url = params.response.url;
        const type = params.type;
        if (url.includes(targetApiPattern) && (type === 'XHR' || type === 'Fetch')) {
            handleBattleResponse(src, params.requestId);
        }
    } else if (method === "Target.attachedToTarget") {
        const { sessionId, targetInfo } = params;
        if (targetInfo.type === "iframe" || targetInfo.type === "worker" || targetInfo.type === "page") {
            enableNetwork(src.tabId, sessionId);
        }
    }
});

async function maybeAttach(tab) {
    if (!tab.url || !tab.url.includes(gameUrlPattern) || TAB[tab.id]) return;
    try {
        TAB[tab.id] = true; // Mark as "attempting" to prevent re-entry
        await chrome.debugger.attach({ tabId: tab.id }, "1.3");
        await chrome.debugger.sendCommand({ tabId: tab.id }, "Target.setAutoAttach", { autoAttach: true, waitForDebuggerOnStart: false, flatten: true });
        await enableNetwork(tab.id, undefined);
        console.log(`🎉 Attached & ready on tab ${tab.id}`);
    } catch (e) {
        console.error(`❌ Error in maybeAttach(tab ${tab.id}):`, e);
        delete TAB[tab.id]; // Unmark on failure
    }
}

async function enableNetwork(tabId, sessionId) {
    const target = sessionId ? { tabId, sessionId } : { tabId };
    const sid = sessionId ?? "top";
    try {
        await chrome.debugger.sendCommand(target, "Network.enable");
        SESSIONS[sid] = { tabId };
    } catch (e) { /* Ignore error */ }
}

function handleBattleResponse(src, requestId) {
    chrome.debugger.sendCommand(src, "Network.getResponseBody", { requestId }, response => {
        if (chrome.runtime.lastError || !response?.body) return;

        try {
            const json = JSON.parse(response.body);
            const { MiSh = [], SpSh = [] } = json.OpponentBoard || {};

            const minions = MiSh.filter(Boolean).map(({ Enu, Fro }) => ({
                enu: Enu,
                fro: Fro,
                name: PET_MAP[Enu] || `Unknown Pet (${Enu})` // Map Enu to name
            }));

            const spells = SpSh.filter(Boolean).map(({ Enu, Fro }) => ({
                enu: Enu,
                fro: Fro,
                name: FOOD_MAP[Enu] || `Unknown Food (${Enu})` // Map Enu to name
            }));

            chrome.storage.local.set({
                battleData: { minions, spells, timestamp: Date.now() }
            });
             console.log("🎉 Battle data processed and stored successfully!");
        } catch (e) {
            console.error("❌ JSON.parse failed:", e);
        }
    });
}

function hookAlreadyOpenTabs() {
    chrome.tabs.query({ url: `*://${gameUrlPattern}*` }, tabs => {
        tabs.forEach(tab => {
            if (tab.status === "complete") maybeAttach(tab);
        });
    });
}