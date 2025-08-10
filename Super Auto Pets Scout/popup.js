// popup.js
const PET_MAP = {"0":"Ant","555":"Lemming","440":"Volcano Snail","418":"Iriomote Cat","396":"Banggai Cardinalfish","420":"Longcomb Sawfish","399":"Blue Whale","403":"California Condor","424":"Philippine Eagle","532":"Marine Iguana","419":"Kakapo","417":"Ili Pika","402":"Bonobo","416":"Humphead Wrasse","413":"Green Sea Turtle","426":"Pygmy Hog","432":"Silky Sifaka","411":"Giant Pangasius","398":"Black Rhino","439":"Tucuxi","409":"Geometric Tortoise","433":"Spoon-Billed Sandpiper","395":"Aye-Aye","400":"Blue-Throated Macaw","425":"Proboscis Monkey","428":"Red Panda","408":"Fan Mussel","716":"Snow Leopard","423":"Painted Terrapin","391":"Amsterdan Albatross","436":"Taita Thrush","412":"Giant Tortoise","414":"Hawaiian Monk Seal","437":"Tasmanian Devil","717":"Hirola","392":"Angelshark","720":"Golden Tamarin","410":"Giant Otter","401":"Bombus Dahlbomii","390":"Amazon River Dolphin","422":"Monkey-Faced Bat","389":"Amami Rabbit","429":"Roloway Monkey","441":"White-Bellied Heron","407":"European Mink","404":"Darwin's Fox","435":"Tatta Shrew","534":"Tree Kangaroo","719":"Tain","713":"Togian Babirusa","338":"African Wild Dog","430":"Saker Falcon","427":"Pygmy Hog","421":"Malay Tapir","394":"Araripe Manakin","406":"Ethiopian Wolf","715":"Takhi","438":"Tooth Billed Pigeon","10":"Camel","334":"Bigfoot","336":"Calygreyhound","330":"Tiger Bug","631":"Amalgamation","558":"Pheasant","627":"Pengobble","624":"Bush","541":"Chihuahua","545":"Dumbo","536":"Ammonite","561":"Real Velociraptor","553":"Ibex","546":"Elk","549":"Fossa","572":"Tuna","537":"Bass","539":"Cardinal","567":"Sparrow","547":"Fairy Armadillo","803":"Shima Enaga","100":"Tropical Fish","103":"Boar","104":"Dromedary","105":"Anteater","106":"Fox","107":"Panda","108":"Polar Bear","109":"Guinea Pig","11":"Cat","110":"Hamster","111":"Donkey","112":"Koala","113":"Duckling","114":"Lioness","115":"Velociraptor","116":"Orca","117":"Clownfish","118":"Piranha","119":"Sword Fish","12":"Caterpillar","120":"Eel","121":"Gold Fish","122":"Jellyfish","123":"Hammerhead Shark","124":"Komodo","125":"Ostrich","126":"Praying Mantis","127":"Hawk","128":"Seagull","129":"Pelican","13":"Chick","130":"Okapi","131":"Kiwi","132":"Atlantic Puffin","133":"Cassowary","134":"Shoebill","135":"Vulture","136":"Stork","137":"Frigatebird","138":"Hummingbird","139":"Frog","14":"Chicken","140":"Bear","141":"Moth","142":"Triceratops","565":"Siamese","143":"Spinosaurus","144":"Stegosaurus","145":"Pug","146":"Siberian Husky","147":"Iguana","148":"Sabertooth Tiger","149":"Pillbug","15":"Cow","150":"Blobfish","151":"Toucan","152":"Seahorse","153":"Starfish","154":"Capybara","155":"Zebra","156":"Woodpecker","157":"Orangutan","158":"Raccoon","159":"Platypus","16":"Crab","160":"Wasp","161":"Chinchilla","162":"Toad","163":"Yak","164":"Salamander","165":"Leech","166":"Armadillo","167":"Hyena","168":"Mole","169":"Porcupine","17":"Cricket","170":"Wolf","171":"Baboon","172":"Ferret","173":"Weasel","174":"Catfish","175":"Sealion","176":"Cuttlefish","177":"Squid","178":"Sting Ray","179":"Guinea Piglet","18":"Cockroach","180":"Anglerfish","181":"Bird of Paradise","182":"Beluga Whale","183":"Loyal Chinchilla","184":"Chipmunk","185":"Gazelle","186":"Highland Cow","187":"Opossum","188":"Golden Retriever","189":"Bulldog","19":"Crocodile","190":"Mantis Shrimp","191":"Sea Turtle","192":"Manatee","193":"Aardvark","194":"Alpaca","195":"Crow","196":"Dragonfly","197":"Emperor Tamarin","198":"Frilled Dragon","199":"Jerboa","2":"Badger","20":"Deer","200":"Lynx","201":"Lionfish","202":"Moose","203":"Meerkat","204":"Marmoset","205":"Reindeer","206":"White Tiger","207":"Wombat","208":"Tapir","209":"Walrus","21":"Dodo","210":"African Penguin","212":"Axolotl","213":"Beluga Sturgeon","214":"Betta Fish","215":"Black Necked Stilt","216":"Chameleon","217":"Cobra","218":"Cockatoo","219":"Crane","22":"Dog","220":"Door Head Ant","221":"Egyptian Vulture","222":"Elephant Seal","223":"Emu","224":"Falcon","225":"Flea","226":"Flying Fish","227":"Flying Squirrel","228":"Guineafowl","229":"Gecko","23":"Dolphin","230":"German Shepherd","231":"Gharial","232":"Goose","233":"Groundhog","234":"Hercules Beetle","235":"Hoopoe Bird","236":"Lemur","237":"Lizard","238":"Macaque","239":"Magpie","24":"Dove","240":"Manta Ray","241":"Mongoose","242":"Mosasaurus","245":"Musk Ox","246":"Nyala","247":"Osprey","248":"Oyster","249":"Pangolin","25":"Dragon","250":"Panther","251":"Pied Tamarin","252":"Poison Dart Frog","253":"Pteranodon","254":"Puma","255":"Robin","256":"Royal Flycatcher","257":"Saiga Antelope","258":"Sea Urchin","259":"Secretary Bird","26":"Duck","260":"Silkmoth","261":"Silver Fox","262":"Slug","263":"Stoat","264":"Surgeon Fish","265":"Vaquita","266":"Warthog","267":"Whale Shark","268":"Wildebeest","269":"Wolverine","27":"Eagle","270":"Smaller Slug","271":"Blue Ringed Octopus","272":"Cone Snail","273":"Doberman","274":"Fire Ant","275":"Grizzly Bear","276":"Nurse Shark","277":"Snapping Turtle","278":"Stonefish","28":"Elephant","282":"Lizard Tail","29":"Flamingo","3":"Beaver","30":"Fly","31":"Zombie Fly","32":"Fish","33":"Giraffe","34":"Goat","340":"Cockatrice","341":"Drop Bear","342":"Fairy","343":"Fire Pup","344":"Frost Wolf","345":"Gargoyle","346":"Ghost Kitten","348":"Griffin","349":"Brain Cramp","350":"Hippocampus","352":"Hydra","353":"Jackalope","354":"Kitsune","355":"Kraken","356":"Leviathan","357":"Mandrake","358":"Manticore","359":"Mimic","36":"Gorilla","360":"Minotaur","362":"Murmel","363":"Nessie","364":"Ouroboros","365":"Pegasus","366":"Phoenix","367":"Quetzalcoatl","368":"Red Dragon","369":"Roc","37":"Hedgehog","397":"Bay Cat","415":"Helmeted Hornbill","434":"Sumatran Tiger","431":"Saola","370":"Salmon of Knowledge","371":"Worm of Sand","372":"Sea Serpent","373":"Abomination","374":"Skeleton Dog","375":"Slime","376":"Sphinx","377":"Axehandle Hound","378":"Tree","379":"Tsuchinoko","38":"Hippo","380":"Unicorn","381":"Vampire Bat","382":"Warf","383":"Werewolf","384":"Monty","385":"Wyvern","386":"Visitor","387":"Yeti","39":"Horse","393":"Tahr","4":"Bee","40":"Kangaroo","405":"Mandrill","41":"Leopard","42":"Lion","44":"Llama","45":"Mammoth","46":"Monkey","47":"Mosquito","477":"Smallest Slug","48":"Mouse","5":"Bison","50":"Octopus","508":"Nest","51":"Otter","52":"Ox","53":"Parrot","54":"Peacock","55":"Rhino","551":"Hare","559":"Pigeon","56":"Penguin","57":"Rat","58":"Dirty Rat","59":"Pig","60":"Rabbit","601":"Bunyip","604":"Mothman","605":"Nightcrawler","606":"Sleipnir","607":"Tandgnost","608":"Tandgrisner","610":"Thunderbird","611":"Cuddle Toad","612":"Old Mouse","613":"Bad Dog","614":"Fake Nessie","616":"Questing Beast","617":"Sneaky Egg","619":"Pixiu","62":"Ram","621":"Barghest","622":"Rootling","623":"Lucky Cat","625":"Foo Dog","626":"Alchemedes","628":"Baku","63":"Rooster","630":"Cyclops","634":"Golden Beetle","635":"Mana Hound","636":"Team Spirit","337":"Cerberus","638":"Rock","639":"Ogopogo","640":"Loveland Frogman","641":"Daycrawler","642":"Smaller Slime","643":"Hydra Head","644":"Giant Eyes Dog","646":"Young Phoenix","647":"Cracked Egg","648":"Chimera Goat","649":"Chimera Snake","65":"Scorpion","650":"Chimera Lion","651":"Deer Lord","652":"Jersey Devil","653":"Fur-Bearing Trout","654":"Tatzelwurm","655":"Kappa","656":"Boitata","657":"Nurikabe","658":"Good Dog","659":"Burbel","66":"Seal","67":"Shrimp","68":"Sheep","69":"Shark","7":"Blowfish","70":"Skunk","71":"Sloth","72":"Snail","73":"Snake","74":"Spider","75":"Squirrel","76":"Swan","77":"Tiger","78":"Tyrannosaurus","79":"Turkey","8":"Buffalo","80":"Turtle","81":"Whale","82":"Worm","85":"Bus","86":"Zombie Cricket","87":"Bat","88":"Beetle","89":"Bluebird","9":"Butterfly","91":"Hatching Chick","92":"Ladybug","93":"Lobster","94":"Microbe","95":"Owl","96":"Poodle","333":"Behemoth","97":"Puppy","98":"Sauropod","99":"Tabby Cat"};
// 4 is unknown golden food, 193 is prob durian
const FOOD_MAP = {
    "0":"Apple",
    "134":"Better Apple",
    "135":"Best Apple",
    "64":"Peach",
    "117":"Asparagus",
    "2":"Bacon",
    "139":"Bread Crumbs",
    "130":"Chocolate Milk",
    "131":"Better Chocolate Milk",
    "132":"Best Chocolate Milk",
    "33":"Egg",
    "20":"Cherry",
    "24":"Chocolate Cake",
    "11":"Brocolli",
    "1":"Avocado",
    "109":"Fig",
    "72":"Lettuce",
    "4":"Banana",
    "66":"Potato",
    "86":"Waffle",
    "113":"Durian",
    "53":"Onion",
    "62":"Pita Bread",
    "67":"Pretzel",
    "85":"Tomato",
    "40":"Honey",
    "191":"Fresh Water",
    "192":"Gros Michel Banana",
    "81":"Strawberry",
    "157":"Mana Potion",
    "150":"Heath Potion",
    "70":"Rice",
    "195":"Sudduth Tomato",
    "207":"Cod Roe",
    "170":"Lime",
    "140":"Faint Bread",
    "144":"Fairy Dust",
    "50":"Cupcake",
    "92":"Sleeping Pill",
    "100":"Fried Shrimp",
    "9":"Meat Bone",
    "73":"Salad Bowl",
    "196":"Unagi",
    "208":"Antartic Krill",
    "38":"Garlic",
    "201":"Carrot Parisier",
    "198":"White Truffle",
    "153":"Porridge",
    "161":"Water of Youth",
    "48":"Lollipop",
    "114":"Sausage",
    "184":"Seaweed",
    "124":"Caramel",
    "160":"Yggdrasil Fruit",
    "121":"Squash",
    "29":"Croissant",
    "147":"Gingerbread Man",
    "159":"Wall Chicken",
    "172":"Blackberry",
    "211":"Geechee Red Pea",
    "194":"Maple Syrup",
    "3":"Baguette",
    "197":"Vanilla Bean",
    "19":"Cheese",
    "16":"Canned Food",
    "58":"Pear",
    "60":"Pie",
    "74":"Salt",
    "138":"Ambrosia",
    "141":"Drink-Me Liquid",
    "143":"Eat-Me Cake",
    "22":"Chili",
    "125":"Lasagna",
    "156":"Magic Beans",
    "47":"Lemon",
    "82":"Sushi",
    "190":"Cocoa Bean",
    "209":"Oblonot",
    "168":"Strawberry Jam",
    "96":"Melon",
    "51":"Mushroom",
    "23":"Chocolate",
    "189":"Chickpea",
    "79":"Steak",
    "41":"Hot Dog",
    "171":"Starfruit",
    "63":"Pizza",
    "55":"Pancakes",
    "120":"Celery",
    "152":"Peach of Immortality",
    "202":"Big Mana Potion",
    "154":"Konpeito",
    "166":"Cornucopia",
    "199":"White Okra",
    "106":"Judean Date",
    "200":"Sardinian Currant",
    "59":"Pepper"
};

// Render the two tables and timestamp
function render({ minions, spells, timestamp, calculatorLink }) {
    const minionsContainer = document.getElementById('minions-container');
    const spellsContainer  = document.getElementById('spells-container');
    const statusDiv        = document.getElementById('status');
    const timestampDiv     = document.getElementById('timestamp');
    const calcLinkContainer = document.getElementById('calculator-link-container');
    const calcLink = document.getElementById('calculator-link');
  
    // Clear previous rows
    minionsContainer.innerHTML = '';
    spellsContainer.innerHTML  = '';
  
    // Hide the “waiting” status when we have data
    statusDiv.style.display = 'none';
  
    // Populate the Pet Shop table
    if (minions.length) {
      minions.forEach(({ enu, fro }) => {
        const row = document.createElement('tr');
  
        // Pet name (with ID fallback)
        const petCell = document.createElement('td');
        const name = PET_MAP[enu] || `Unknown (${enu})`;
        petCell.textContent = `${name} (${enu})`;
  
        // Frozen icon or blank
        const frozenCell = document.createElement('td');
        frozenCell.className = 'frozen-cell';
        frozenCell.textContent = fro ? '🧊' : '';
  
        row.appendChild(petCell);
        row.appendChild(frozenCell);
        minionsContainer.appendChild(row);
      });
    }
  
    // Populate the Food Shop table
    if (spells.length) {
      spells.forEach(({ enu, fro }) => {
        const row = document.createElement('tr');
  
        // Just show the numeric ID for food
        const foodCell = document.createElement('td');
        const foodName = FOOD_MAP[enu] || `Unknown (${enu})`;
        foodCell.textContent = `${foodName} (${enu})`;
  
        const frozenCell = document.createElement('td');
        frozenCell.className = 'frozen-cell';
        frozenCell.textContent = fro ? '🧊' : '';
  
        row.appendChild(foodCell);
        row.appendChild(frozenCell);
        spellsContainer.appendChild(row);
      });
    }

    if (calculatorLink) {
        calcLink.href = calculatorLink;
        calcLinkContainer.style.display = 'block';
    } else {
        calcLink.href = "https://sap-calculator.vercel.app/";
        calcLinkContainer.style.display = 'none';
    }
  
    // Update the timestamp
    if (timestamp) {
      timestampDiv.textContent = `Last updated: ${new Date(timestamp).toLocaleTimeString()}`;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const statusDiv = document.getElementById('status');
  
    // 1) Initial load
    chrome.storage.local.get('battleData', result => {
      if (result.battleData) {
        render(result.battleData);
      } else {
        statusDiv.textContent = 'No battle data captured yet. Play a round!';
      }
    });
  
    // 2) Live updates from background.js
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.type === 'NEW_BATTLE_DATA' && msg.payload) {
        render(msg.payload);
        sendResponse({ ok: true });
      }
    });
  });