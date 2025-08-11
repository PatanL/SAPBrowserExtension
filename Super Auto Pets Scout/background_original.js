const gameUrlPattern   = "teamwood.itch.io/super-auto-pets";
const targetApiPattern = "/api/battle/get/";
const buildPattern     = "/api/build/";

const TAB      = {};      // TAB[tabId] = true once we’ve attached
const SESSIONS = {}; // SESSIONS[sessionId] = { tabId } once Network is enabled

const PET_MAP = {"0":"Ant","555":"Lemming","440":"Volcano Snail","418":"Iriomote Cat","396":"Banggai Cardinalfish","420":"Longcomb Sawfish","399":"Blue Whale","403":"California Condor","424":"Philippine Eagle","532":"Marine Iguana","419":"Kakapo","417":"Ili Pika","402":"Bonobo","416":"Humphead Wrasse","413":"Green Sea Turtle","426":"Pygmy Hog","432":"Silky Sifaka","411":"Giant Pangasius","398":"Black Rhino","439":"Tucuxi","409":"Geometric Tortoise","433":"Spoon-Billed Sandpiper","395":"Aye-Aye","400":"Blue-Throated Macaw","425":"Proboscis Monkey","428":"Red Panda","408":"Fan Mussel","716":"Snow Leopard","423":"Painted Terrapin","391":"Amsterdan Albatross","436":"Taita Thrush","412":"Giant Tortoise","414":"Hawaiian Monk Seal","437":"Tasmanian Devil","717":"Hirola","392":"Angelshark","720":"Golden Tamarin","410":"Giant Otter","401":"Bombus Dahlbomii","390":"Amazon River Dolphin","422":"Monkey-Faced Bat","389":"Amami Rabbit","429":"Roloway Monkey","441":"White-Bellied Heron","407":"European Mink","404":"Darwin's Fox","435":"Tatta Shrew","534":"Tree Kangaroo","719":"Tain","713":"Togian Babirusa","338":"African Wild Dog","430":"Saker Falcon","427":"Pygmy Hog","421":"Malay Tapir","394":"Araripe Manakin","406":"Ethiopian Wolf","715":"Takhi","438":"Tooth Billed Pigeon","10":"Camel","334":"Bigfoot","336":"Calygreyhound","330":"Tiger Bug","631":"Amalgamation","558":"Pheasant","627":"Pengobble","624":"Bush","541":"Chihuahua","545":"Dumbo","536":"Ammonite","561":"Real Velociraptor","553":"Ibex","546":"Elk","549":"Fossa","572":"Tuna","537":"Bass","539":"Cardinal","567":"Sparrow","547":"Fairy Armadillo","803":"Shima Enaga","100":"Tropical Fish","103":"Boar","104":"Dromedary","105":"Anteater","106":"Fox","107":"Panda","108":"Polar Bear","109":"Guinea Pig","11":"Cat","110":"Hamster","111":"Donkey","112":"Koala","113":"Duckling","114":"Lioness","115":"Velociraptor","116":"Orca","117":"Clownfish","118":"Piranha","119":"Sword Fish","12":"Caterpillar","120":"Eel","121":"Gold Fish","122":"Jellyfish","123":"Hammerhead Shark","124":"Komodo","125":"Ostrich","126":"Praying Mantis","127":"Hawk","128":"Seagull","129":"Pelican","13":"Chick","130":"Okapi","131":"Kiwi","132":"Atlantic Puffin","133":"Cassowary","134":"Shoebill","135":"Vulture","136":"Stork","137":"Frigatebird","138":"Hummingbird","139":"Frog","14":"Chicken","140":"Bear","141":"Moth","142":"Triceratops","565":"Siamese","143":"Spinosaurus","144":"Stegosaurus","145":"Pug","146":"Siberian Husky","147":"Iguana","148":"Sabertooth Tiger","149":"Pillbug","15":"Cow","150":"Blobfish","151":"Toucan","152":"Seahorse","153":"Starfish","154":"Capybara","155":"Zebra","156":"Woodpecker","157":"Orangutan","158":"Raccoon","159":"Platypus","16":"Crab","160":"Wasp","161":"Chinchilla","162":"Toad","163":"Yak","164":"Salamander","165":"Leech","166":"Armadillo","167":"Hyena","168":"Mole","169":"Porcupine","17":"Cricket","170":"Wolf","171":"Baboon","172":"Ferret","173":"Weasel","174":"Catfish","175":"Sealion","176":"Cuttlefish","177":"Squid","178":"Sting Ray","179":"Guinea Piglet","18":"Cockroach","180":"Anglerfish","181":"Bird of Paradise","182":"Beluga Whale","183":"Loyal Chinchilla","184":"Chipmunk","185":"Gazelle","186":"Highland Cow","187":"Opossum","188":"Golden Retriever","189":"Bulldog","19":"Crocodile","190":"Mantis Shrimp","191":"Sea Turtle","192":"Manatee","193":"Aardvark","194":"Alpaca","195":"Crow","196":"Dragonfly","197":"Emperor Tamarin","198":"Frilled Dragon","199":"Jerboa","2":"Badger","20":"Deer","200":"Lynx","201":"Lionfish","202":"Moose","203":"Meerkat","204":"Marmoset","205":"Reindeer","206":"White Tiger","207":"Wombat","208":"Tapir","209":"Walrus","21":"Dodo","210":"African Penguin","212":"Axolotl","213":"Beluga Sturgeon","214":"Betta Fish","215":"Black Necked Stilt","216":"Chameleon","217":"Cobra","218":"Cockatoo","219":"Crane","22":"Dog","220":"Door Head Ant","221":"Egyptian Vulture","222":"Elephant Seal","223":"Emu","224":"Falcon","225":"Flea","226":"Flying Fish","227":"Flying Squirrel","228":"Guineafowl","229":"Gecko","23":"Dolphin","230":"German Shepherd","231":"Gharial","232":"Goose","233":"Groundhog","234":"Hercules Beetle","235":"Hoopoe Bird","236":"Lemur","237":"Lizard","238":"Macaque","239":"Magpie","24":"Dove","240":"Manta Ray","241":"Mongoose","242":"Mosasaurus","245":"Musk Ox","246":"Nyala","247":"Osprey","248":"Oyster","249":"Pangolin","25":"Dragon","250":"Panther","251":"Pied Tamarin","252":"Poison Dart Frog","253":"Pteranodon","254":"Puma","255":"Robin","256":"Royal Flycatcher","257":"Saiga Antelope","258":"Sea Urchin","259":"Secretary Bird","26":"Duck","260":"Silkmoth","261":"Silver Fox","262":"Slug","263":"Stoat","264":"Surgeon Fish","265":"Vaquita","266":"Warthog","267":"Whale Shark","268":"Wildebeest","269":"Wolverine","27":"Eagle","270":"Smaller Slug","271":"Blue Ringed Octopus","272":"Cone Snail","273":"Doberman","274":"Fire Ant","275":"Grizzly Bear","276":"Nurse Shark","277":"Snapping Turtle","278":"Stonefish","28":"Elephant","282":"Lizard Tail","29":"Flamingo","3":"Beaver","30":"Fly","31":"Zombie Fly","32":"Fish","33":"Giraffe","34":"Goat","340":"Cockatrice","341":"Drop Bear","342":"Fairy","343":"Fire Pup","344":"Frost Wolf","345":"Gargoyle","346":"Ghost Kitten","348":"Griffin","349":"Brain Cramp","350":"Hippocampus","352":"Hydra","353":"Jackalope","354":"Kitsune","355":"Kraken","356":"Leviathan","357":"Mandrake","358":"Manticore","359":"Mimic","36":"Gorilla","360":"Minotaur","362":"Murmel","363":"Nessie","364":"Ouroboros","365":"Pegasus","366":"Phoenix","367":"Quetzalcoatl","368":"Red Dragon","369":"Roc","37":"Hedgehog","397":"Bay Cat","415":"Helmeted Hornbill","434":"Sumatran Tiger","431":"Saola","370":"Salmon of Knowledge","371":"Worm of Sand","372":"Sea Serpent","373":"Abomination","374":"Skeleton Dog","375":"Slime","376":"Sphinx","377":"Axehandle Hound","378":"Tree","379":"Tsuchinoko","38":"Hippo","380":"Unicorn","381":"Vampire Bat","382":"Warf","383":"Werewolf","384":"Monty","385":"Wyvern","386":"Visitor","387":"Yeti","39":"Horse","393":"Tahr","4":"Bee","40":"Kangaroo","405":"Mandrill","41":"Leopard","42":"Lion","44":"Llama","45":"Mammoth","46":"Monkey","47":"Mosquito","477":"Smallest Slug","48":"Mouse","5":"Bison","50":"Octopus","508":"Nest","51":"Otter","52":"Ox","53":"Parrot","54":"Peacock","55":"Rhino","551":"Hare","559":"Pigeon","56":"Penguin","57":"Rat","58":"Dirty Rat","59":"Pig","60":"Rabbit","601":"Bunyip","604":"Mothman","605":"Nightcrawler","606":"Sleipnir","607":"Tandgnost","608":"Tandgrisner","610":"Thunderbird","611":"Cuddle Toad","612":"Old Mouse","613":"Bad Dog","614":"Fake Nessie","616":"Questing Beast","617":"Sneaky Egg","619":"Pixiu","62":"Ram","621":"Barghest","622":"Rootling","623":"Lucky Cat","625":"Foo Dog","626":"Alchemedes","628":"Baku","63":"Rooster","630":"Cyclops","634":"Golden Beetle","635":"Mana Hound","636":"Team Spirit","337":"Cerberus","638":"Rock","639":"Ogopogo","640":"Loveland Frogman","641":"Daycrawler","642":"Smaller Slime","643":"Hydra Head","644":"Giant Eyes Dog","646":"Young Phoenix","647":"Cracked Egg","648":"Chimera Goat","649":"Chimera Snake","65":"Scorpion","650":"Chimera Lion","651":"Deer Lord","652":"Jersey Devil","653":"Fur-Bearing Trout","654":"Tatzelwurm","655":"Kappa","656":"Boitata","657":"Nurikabe","658":"Good Dog","659":"Burbel","66":"Seal","67":"Shrimp","68":"Sheep","69":"Shark","7":"Blowfish","70":"Skunk","71":"Sloth","72":"Snail","73":"Snake","74":"Spider","75":"Squirrel","76":"Swan","77":"Tiger","78":"Tyrannosaurus","79":"Turkey","8":"Buffalo","80":"Turtle","81":"Whale","82":"Worm","85":"Bus","86":"Zombie Cricket","87":"Bat","88":"Beetle","89":"Bluebird","9":"Butterfly","91":"Hatching Chick","92":"Ladybug","93":"Lobster","94":"Microbe","95":"Owl","96":"Poodle","333":"Behemoth","97":"Puppy","98":"Sauropod","99":"Tabby Cat"};
const PERK_MAP = {
  "60": "Ambrosia",
  "64": "Baguette",
  "25": "Banana",
  "87": "Big Mana Potion",
  "89": "Blackberry",
  "28": "Blueberry",
  "111": "Bok Choy",
  "66": "Brussels Sprout",
  "67": "Caramel",
  "15": "Carrot",
  "71": "Cauliflower",
  "23": "Cheese",
  "7": "Cherry",
  "5": "Chili",
  "30": "Chocolate Cake",
  "70": "Churros",
  "94": "Cocoa Bean",
  "0": "Coconut",
  "104": "Cod Roe",
  "54": "Cold",
  "57": "Crisp",
  "20": "Croissant",
  "19": "Cucumber",
  "55": "Dazed",
  "36": "Donut",
  "45": "Durian",
  "51": "Easter Egg",
  "24": "Egg",
  "38": "Eggplant",
  "68": "Eucalyptus",
  "86": "Faint Bread",
  "49": "Fairy Dust",
  "46": "Fig",
  "11": "Fortune Cookie",
  "9": "Garlic",
  "52": "Gingerbread Man",
  "47": "Golden Egg",
  "16": "Grapes",
  "103": "Gros Michel Banana",
  "58": "Health Potion",
  "8": "Honey",
  "110": "Honeydew Melon",
  "56": "Icky",
  "37": "Inked",
  "78": "Kiwano",
  "22": "Lemon",
  "108": "Lime",
  "59": "Love Potion",
  "76": "Lychee",
  "48": "Magic Beans",
  "61": "Mana Potion",
  "93": "Maple Syrup",
  "6": "Meat Bone",
  "13": "Melon",
  "79": "Melon Slice",
  "1": "Mushroom",
  "31": "Onion",
  "77": "Oyster Mushroom",
  "35": "Pancakes",
  "2": "Peanut",
  "88": "Peanut Butter",
  "18": "Pepper",
  "39": "Pie",
  "21": "Pineapple",
  "33": "Pita Bread",
  "17": "Popcorn",
  "29": "Potato",
  "65": "Radish",
  "62": "Rambutan",
  "43": "Rice",
  "3": "Salt",
  "100": "Sardinian Currant",
  "69": "Sausage",
  "72": "Seaweed",
  "75": "Silly",
  "26": "Skewer",
  "84": "Sleepy",
  "63": "Spooked",
  "109": "Squash",
  "12": "Steak",
  "14": "Strawberry",
  "95": "Sudduth Tomato",
  "85": "Tasty",
  "34": "Tomato",
  "97": "Unagi",
  "10": "Weak",
  "101": "White Okra",
  "91": "White Truffle",
  "50": "Yggdrasil Fruit"
};
const TOY_MAP = {
  "294": "Action Figure",
  "479": "Balloon",
  "299": "Boot",
  "300": "Bowling Ball",
  "310": "Broken Piggy Bank",
  "302": "Cardboard Box",
  "794": "Chocolate Box",
  "482": "Crumpled Paper",
  "580": "Crystal Ball",
  "303": "Deck of Cards",
  "304": "Dice",
  "286": "Dice Cup",
  "485": "Flute",
  "306": "Handkerchief",
  "307": "Kite",
  "506": "Lamp",
  "308": "Lunchbox",
  "581": "Magic Wand",
  "590": "Onesie",
  "312": "Paper Shredder",
  "313": "Pen",
  "284": "Pill Bottle",
  "314": "Pogo Stick",
  "315": "Remote Car",
  "582": "Ring",
  "316": "Ring Pyramid",
  "285": "Rock Bag",
  "318": "Rubber Duck",
  "795": "Scale",
  "486": "Soccer Ball",
  "792": "Sticky Hand",
  "324": "Stuffed Bear",
  "478": "Tennis Ball",
  "793": "Vacuum Cleaner",
  "600": "Witch Broom",
  "301": "Broom",
  "509": "Garlic Press",
  "598": "Magic Carpet",
  "575": "Magic Lamp",
  "699": "Microwave Oven",
  "789": "Plastic Saw",
  "488": "Radio",
  "574": "Candelabra",
  "586": "Glass Shoes",
  "589": "Golden Harp",
  "595": "Lock of Hair",
  "578": "Magic Mirror",
  "311": "Oven Mitts",
  "599": "Pickaxe",
  "576": "Red Cape",
  "579": "Rosebud",
  "319": "Scissors",
  "326": "Toilet Paper",
  "327": "Toy Mouse",
  "591": "Treasure Chest",
  "594": "Treasure Map",
  "507": "Foam Sword",
  "510": "Melon Helmet",
  "584": "Nutcracker",
  "587": "Ocarina",
  "585": "Thunder Hammer",
  "588": "Tinder Box",
  "493": "Toy Gun",
  "645": "Evil Book",
  "484": "Flashlight",
  "593": "Pandoras Box",
  "513": "Stinky Sock",
  "511": "Air Palm Tree",
  "583": "Excalibur",
  "592": "Holy Grail",
  "512": "Peanut Jar",
  "491": "Television"
};
const PACK_MAP = { 0: "Turtle", 1: "Puppy", 2: "Star", 3: "Golden", 6: "Unicorn" };


// Keep track of battle GETs
const pending = new Set();

chrome.runtime.onInstalled.addListener(() => {
  
  hookAlreadyOpenTabs();
});

// Attach debugger when a tab finishes loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  
  if (changeInfo.status === "complete") {
    maybeAttach(tab);
  }
});

// Attach debugger when switching tabs
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  
  try {
    const tab = await chrome.tabs.get(tabId);
    maybeAttach(tab);
  } catch (e) {
    console.error("❌ [tabs.onActivated] failed to get tab:", e);
  }
});

// Listen to all debugger events
chrome.debugger.onEvent.addListener((src, method, params) => {
  const sid = src.sessionId ?? "top";
  

  if (!SESSIONS[sid]) {
    
    return;
  }

  // ─── 1) Build API: take an automatic screenshot ───────────────────────────
  if (method === "Network.responseReceived"
      && params.response.url.includes(buildPattern)) {

    

    // Log your permissions state
    
    chrome.permissions.getAll(all => {
      
    });
    chrome.permissions.contains({ origins: ["<all_urls>"] }, hasAll => {
      
    });

    // Grab the current window and screenshot it
    chrome.windows.getCurrent(win => {
      
      chrome.tabs.captureVisibleTab(
        /* windowId */ win.id,
        /* options  */ { format: "png", quality: 100 },
        dataUrl => {
          if (chrome.runtime.lastError) {
            console.error("❌ captureVisibleTab failed:", chrome.runtime.lastError);
            return;
          }
          
          chrome.storage.local.set({ lastBuildScreenshot: dataUrl }, () => {
            
          });
        }
      );
    });  // ← closes windows.getCurrent

  }  // ← closes buildPattern if

  // ─── 2) Battle data: queue up /api/battle/get/ bodies ────────────────────
  if (
    method === "Network.responseReceived" &&
    params.type === "XHR" &&
    params.response.status === 200 &&
    params.response.url.includes(targetApiPattern)
  ) {
    
    pending.add(params.requestId);
  }

  if (
    method === "Network.loadingFinished" &&
    pending.has(params.requestId)
  ) {
    
    pending.delete(params.requestId);
    fetchBattleBody(src, params.requestId);
  }

  // Autodetect iframes/workers and re-enable Network
  if (method === "Target.attachedToTarget") {
    const { sessionId, targetInfo } = params;
    
    if (targetInfo.type === "iframe" || targetInfo.type === "worker") {
      enableNetwork(src.tabId, sessionId);
    }
  }
});

// Helper to fetch the battle JSON body
function fetchBattleBody(src, requestId) {
  
  chrome.debugger.sendCommand(
    src,
    "Network.getResponseBody",
    { requestId },
    response => {
      if (chrome.runtime.lastError) {
        console.error("   ❌ getResponseBody failed:", chrome.runtime.lastError.message);
        return;
      }
      
      handleBattleResponse(src, requestId, response.body);
    }
  );
}

// Attach debugger & auto-attach to iframes/workers
async function maybeAttach(tab) {
  
  if (!tab.url || !tab.url.includes(gameUrlPattern)) return;
  if (TAB[tab.id]) return;

  try {
    await chrome.debugger.attach({ tabId: tab.id }, "1.3");
    await chrome.debugger.sendCommand({ tabId: tab.id }, "Target.setAutoAttach", {
      autoAttach: true,
      waitForDebuggerOnStart: false,
      flatten: true
    });
    await enableNetwork(tab.id, undefined);
    TAB[tab.id] = true;
    
  } catch (e) {
    console.error(`   ❌ Error in maybeAttach(tab ${tab.id}):`, e);
  }
}

// Enable the Network domain on a given DevTools session
async function enableNetwork(tabId, sessionId) {
  const target = sessionId ? { tabId, sessionId } : { tabId };
  const sid = sessionId ?? "top";
  try {
    await chrome.debugger.sendCommand(target, "Network.enable");
    SESSIONS[sid] = { tabId };
    
  } catch (e) {
    console.error(`   ❌ Failed to Network.enable for session=${sid}:`, e);
  }
}

// Parse + store the battle JSON you already had
function handleBattleResponse(src, requestId, body) {
  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {
    return console.error("   ❌ JSON.parse failed:", e);
  }
  const { MiSh = [], SpSh = [] } = json.OpponentBoard || {};
  const minions = MiSh.filter(Boolean).map(({ Enu, Fro }) => ({ enu: Enu, fro: Fro }));
  const spells  = SpSh.filter(Boolean).map(({ Enu, Fro }) => ({ enu: Enu, fro: Fro }));

  const calculatorState = parseForCalculator(json);
  const calculatorLink = generateCalculatorLink(calculatorState);

  const battleData = { minions, spells, timestamp: Date.now(), calculatorLink };

  chrome.storage.local.set({ battleData }, () => {
    chrome.runtime.sendMessage({ type: "NEW_BATTLE_DATA", payload: battleData });
  });
}

function parseForCalculator(battleJson) {
  const userBoard = battleJson.UserBoard;
  const opponentBoard = battleJson.OpponentBoard;

  const parsePet = (petJson) => {
      if (!petJson) return null;
      const petId = petJson.Enu;
      const petName = PET_MAP[petId] || null;

      

      let equipment = null;
      if (petJson.Perk !== null && petJson.Perk !== undefined) {
          const perkId = petJson.Perk.toString();
          const perkName = PERK_MAP[perkId];
          if (perkName) {
              equipment = { name: perkName };
          } else {
              console.warn(`[Parser] Unknown Perk ID found: ${perkId}`);
              equipment = { name: "Melon" };
          }
      }
      return {
          name: petName,
          attack: petJson.At?.Perm + petJson.At?.Temp || 0,
          health: petJson.Hp?.Perm + petJson.Hp?.Temp || 0,
          exp: petJson.Exp || 0,
          // Perk mapping is needed here. Defaulting to null.
          equipment: equipment,
          mana: petJson.Mana || 0,
          // --- These are extra fields your calculator supports ---
          belugaSwallowedPet: null,
          abominationSwallowedPet1: null,
          abominationSwallowedPet2: null,
          abominationSwallowedPet3: null,
          battlesFought: 0,
      };
  };

  const parseBoardPets = (boardJson) => {
      const pets = (boardJson?.Mins?.Items || []).filter(Boolean);
      const petArray = Array(5).fill(null);
      pets.forEach(pet => {
          const pos = pet.Poi?.x;
          if (pos >= 0 && pos < 5) {
              petArray[pos] = parsePet(pet);
          }
      });
      return petArray;
  };
  
  const getToy = (boardJson) => {
      const toyItem = (boardJson?.Rel?.Items || []).find(item => item && item.Enu);
      if (toyItem) {
          return {
              name: TOY_MAP[toyItem.Enu] || null, // Toy mapping needed here
              level: toyItem.Lvl || 1
          };
      }
      return { name: null, level: 1 };
  };

  const playerToy = getToy(userBoard);
  const opponentToy = getToy(opponentBoard);

  return {
      playerPack: PACK_MAP[userBoard.Pack] || "Turtle",
      opponentPack: PACK_MAP[opponentBoard.Pack] || "Turtle",
      playerToy: playerToy.name,
      playerToyLevel: String(playerToy.level),
      opponentToy: opponentToy.name,
      opponentToyLevel: String(opponentToy.level),
      turn: userBoard.Tur || 1,
      playerGoldSpent: userBoard.GoSp || 0,
      opponentGoldSpent: opponentBoard.GoSp || 0,
      playerRollAmount: userBoard.Rold || 0,
      opponentRollAmount: opponentBoard.Rold || 0,
      playerSummonedAmount: userBoard.MiSu || 0,
      opponentSummonedAmount: opponentBoard.MiSu || 0,
      // Defaulting these as they are not clearly available
      playerLevel3Sold: 0,
      opponentLevel3Sold: 0,
      // Pet arrays
      playerPets: parseBoardPets(userBoard).reverse(),
      opponentPets: parseBoardPets(opponentBoard).reverse(),
      // Default UI settings
      angler: false,
      allPets: false,
      logFilter: null,
      fontSize: 13,
      customPacks: [],
      oldStork: false,
      tokenPets: false,
      komodoShuffle: false,
      mana: true, // Enable mana since pets can have it
      showAdvanced: true,
      ailmentEquipment: false
  };
}

function generateCalculatorLink(calculatorState) {
  const baseUrl = "https://sap-calculator.vercel.app/"; // Or your deployed calculator URL
  const stateString = JSON.stringify(calculatorState);
  const encodedData = encodeURIComponent(stateString);
  return `${baseUrl}?c=${encodedData}`;
}

// On startup, attach to any already-open tabs
function hookAlreadyOpenTabs() {
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      if (tab.status === "complete") maybeAttach(tab);
    });
  });
}
