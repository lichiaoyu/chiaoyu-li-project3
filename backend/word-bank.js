const COLORS = [
  "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown",
  "black", "white", "gray", "gold", "silver", "beige", "teal", "navy",
  "peach", "coral", "lime", "mint", "olive", "plum", "rose", "tan",
];

const ANIMALS = [
  "dog", "cat", "bear", "lion", "tiger", "zebra", "horse", "sheep",
  "goat", "mouse", "rabbit", "panda", "koala", "otter", "beaver", "monkey",
  "donkey", "camel", "llama", "alpaca", "fox", "wolf", "deer", "moose",
];

const MORE_ANIMALS = [
  "whale", "shark", "dolphin", "seal", "walrus", "yak", "bison", "buffalo",
  "cougar", "jaguar", "leopard", "cheetah", "hyena", "rhino", "hippo", "giraffe",
  "sloth", "weasel", "badger", "mole", "skunk", "ferret", "lemur", "gazelle",
];

const BIRDS = [
  "bird", "eagle", "robin", "crow", "raven", "swan", "goose", "duck",
  "owl", "wren", "finch", "sparrow", "parrot", "falcon", "hawk", "pelican",
  "pigeon", "dove", "turkey", "quail", "stork", "heron", "loon", "kiwi",
];

const SEA_LIFE = [
  "fish", "crab", "clam", "oyster", "shrimp", "lobster", "squid", "octopus",
  "coral", "kelp", "eel", "trout", "salmon", "tuna", "cod", "anchor",
  "pearl", "shell", "reef", "tide", "wave", "beach", "coast", "harbor",
];

const INSECTS = [
  "ant", "bee", "wasp", "moth", "fly", "gnat", "beetle", "roach",
  "spider", "tick", "flea", "worm", "snail", "slug", "cricket", "locust",
  "dragonfly", "ladybug", "firefly", "termite", "weevil", "mantis", "cicada", "aphid",
];

const FRUITS = [
  "apple", "pear", "peach", "plum", "grape", "melon", "berry", "cherry",
  "mango", "papaya", "guava", "lemon", "lime", "orange", "banana", "kiwi",
  "apricot", "fig", "date", "raisin", "coconut", "lychee", "olive", "currant",
];

const VEGETABLES = [
  "carrot", "onion", "garlic", "pepper", "tomato", "potato", "bean", "pea",
  "corn", "celery", "radish", "turnip", "parsnip", "beet", "cabbage", "lettuce",
  "spinach", "broccoli", "cauli", "squash", "pumpkin", "yam", "okra", "kale",
];

const FOODS = [
  "bread", "toast", "bagel", "muffin", "cookie", "cracker", "waffle", "pancake",
  "noodle", "pasta", "pizza", "burger", "taco", "nacho", "salad", "soup",
  "stew", "curry", "rice", "oatmeal", "omelet", "cheese", "yogurt", "butter",
];

const DRINKS = [
  "water", "juice", "soda", "tea", "coffee", "cocoa", "milk", "shake",
  "smoothie", "cider", "lemonade", "broth", "latte", "mocha", "punch", "nectar",
  "tonic", "fizz", "slush", "float", "brew", "chai", "seltzer", "espresso",
];

const PLANTS = [
  "plant", "grass", "moss", "fern", "reed", "bamboo", "ivy", "clover",
  "vine", "sprout", "bud", "leaf", "root", "seed", "stalk", "branch",
  "bloom", "petal", "pollen", "thorn", "briar", "shrub", "bush", "hedge",
];

const TREES = [
  "oak", "pine", "maple", "cedar", "birch", "elm", "ash", "fir",
  "spruce", "willow", "walnut", "chestnut", "poplar", "redwood", "sycamore", "yew",
  "cypress", "palm", "linden", "hazel", "beech", "juniper", "hemlock", "sequoia",
];

const FLOWERS = [
  "rose", "lily", "daisy", "tulip", "iris", "violet", "poppy", "orchid",
  "sunflower", "lotus", "peony", "hyacinth", "lavender", "jasmine", "marigold", "azalea",
  "petunia", "zinnia", "begonia", "camellia", "primrose", "bluebell", "buttercup", "aster",
];

const WEATHER = [
  "sun", "rain", "storm", "cloud", "fog", "mist", "snow", "sleet",
  "hail", "wind", "breeze", "gale", "thunder", "lightning", "drizzle", "frost",
  "ice", "heat", "chill", "shade", "glow", "dawn", "dusk", "twilight",
];

const LANDSCAPES = [
  "hill", "valley", "mountain", "canyon", "meadow", "field", "forest", "grove",
  "plain", "desert", "dune", "cliff", "ridge", "trail", "path", "cave",
  "stone", "rock", "boulder", "pebble", "sand", "soil", "earth", "ground",
];

const WATER_WORDS = [
  "river", "creek", "brook", "stream", "lake", "pond", "lagoon", "bay",
  "ocean", "sea", "inlet", "delta", "spring", "waterfall", "pool", "canal",
  "marsh", "swamp", "shore", "bank", "island", "cove", "dock", "pier",
];

const SKY_SPACE = [
  "sky", "star", "moon", "planet", "comet", "meteor", "orbit", "rocket",
  "saturn", "venus", "mars", "mercury", "neptune", "galaxy", "cosmos", "nova",
  "eclipse", "sunbeam", "sunrise", "sunset", "glimmer", "spark", "flare", "shadow",
];

const ROOMS = [
  "home", "house", "room", "door", "window", "wall", "floor", "ceiling",
  "hall", "porch", "patio", "garage", "attic", "cellar", "closet", "pantry",
  "garden", "yard", "fence", "gate", "roof", "chimney", "stairs", "entry",
];

const HOUSE_ITEMS = [
  "lamp", "clock", "mirror", "frame", "rug", "mat", "curtain", "blanket",
  "pillow", "sheet", "basket", "bucket", "candle", "vase", "jar", "box",
  "crate", "shelf", "hanger", "hook", "broom", "mop", "brush", "soap",
];

const KITCHEN = [
  "plate", "bowl", "cup", "glass", "mug", "fork", "spoon", "knife",
  "pan", "pot", "skillet", "oven", "stove", "fridge", "freezer", "toaster",
  "blender", "mixer", "ladle", "spatula", "napkin", "towel", "recipe", "meal",
];

const BEDROOM = [
  "bed", "crib", "cot", "desk", "dresser", "drawer", "trunk", "quilt",
  "robe", "slipper", "alarm", "book", "novel", "journal", "notebook", "poster",
  "toy", "doll", "puzzle", "photo", "radio", "tablet", "charger", "cable",
];

const BATH_LAUNDRY = [
  "bath", "shower", "tub", "sink", "faucet", "toilet", "towel", "sponge",
  "comb", "razor", "lotion", "shampoo", "rinsing", "laundry", "dryer", "washer",
  "hamper", "fabric", "button", "zipper", "thread", "needle", "stitch", "patch",
];

const FURNITURE = [
  "chair", "table", "sofa", "bench", "stool", "couch", "ottoman", "cabinet",
  "wardrobe", "nightstand", "bookshelf", "counter", "desk", "seat", "swing", "crib",
  "beanbag", "locker", "vanity", "stand", "rack", "cart", "tray", "screen",
];

const CLOTHES = [
  "shirt", "pants", "jeans", "shorts", "skirt", "dress", "sweater", "hoodie",
  "jacket", "coat", "vest", "sock", "shoe", "boot", "sandal", "glove",
  "scarf", "hat", "cap", "belt", "apron", "uniform", "pocket", "collar",
];

const BODY = [
  "head", "face", "eye", "ear", "nose", "mouth", "tooth", "tongue",
  "neck", "shoulder", "arm", "elbow", "wrist", "hand", "finger", "thumb",
  "chest", "back", "waist", "hip", "leg", "knee", "ankle", "foot",
];

const SCHOOL = [
  "school", "class", "grade", "lesson", "teacher", "student", "friend", "answer",
  "question", "paper", "pencil", "marker", "eraser", "ruler", "folder", "binder",
  "board", "chalk", "topic", "story", "chapter", "number", "letter", "reading",
];

const OFFICE = [
  "office", "email", "phone", "screen", "mouse", "keyboard", "printer", "folder",
  "report", "memo", "meeting", "ticket", "task", "project", "draft", "update",
  "budget", "salary", "invoice", "client", "server", "network", "login", "logout",
];

const TOOLS = [
  "tool", "hammer", "nail", "screw", "bolt", "wrench", "drill", "saw",
  "level", "pliers", "tape", "glue", "rope", "chain", "ladder", "wheelbarrow",
  "bucket", "shovel", "rake", "hoe", "trowel", "anvil", "chisel", "file",
];

const SHAPES = [
  "shape", "line", "curve", "angle", "circle", "square", "triangle", "oval",
  "diamond", "cube", "cone", "sphere", "arc", "point", "edge", "side",
  "center", "corner", "stripe", "dot", "ring", "loop", "spiral", "pattern",
];

const MATERIALS = [
  "wood", "metal", "steel", "iron", "glass", "paper", "cloth", "wool",
  "cotton", "silk", "linen", "leather", "rubber", "plastic", "brick", "clay",
  "marble", "granite", "copper", "bronze", "silver", "gold", "foam", "fiber",
];

const TEXTURES = [
  "soft", "rough", "smooth", "sticky", "slimy", "sandy", "dusty", "muddy",
  "wet", "dry", "clean", "dirty", "shiny", "dull", "sharp", "blunt",
  "thick", "thin", "light", "heavy", "warm", "cool", "solid", "loose",
];

const SPORTS = [
  "sport", "game", "score", "team", "coach", "player", "ball", "bat",
  "glove", "goal", "race", "track", "field", "court", "skate", "ski",
  "surf", "swim", "dive", "kick", "throw", "catch", "sprint", "medal",
];

const MUSIC = [
  "music", "song", "tune", "beat", "drum", "piano", "violin", "cello",
  "flute", "trumpet", "guitar", "banjo", "harp", "choir", "note", "chord",
  "melody", "rhythm", "tempo", "verse", "chorus", "album", "radio", "singer",
];

const ART = [
  "art", "paint", "color", "brush", "canvas", "sketch", "draw", "ink",
  "charcoal", "poster", "photo", "image", "design", "craft", "glue", "paper",
  "stamp", "bead", "clay", "frame", "gallery", "museum", "artist", "studio",
];

const TOYS = [
  "toy", "block", "kite", "balloon", "marble", "top", "paddle", "wagon",
  "scooter", "tricycle", "train", "rocket", "robot", "drone", "puzzle", "cube",
  "token", "dice", "card", "comic", "sticker", "puppet", "mask", "drum",
];

const TRAVEL = [
  "trip", "tour", "map", "guide", "ticket", "train", "plane", "bus",
  "taxi", "ferry", "subway", "hotel", "hostel", "lobby", "suite", "camp",
  "tent", "trail", "route", "journey", "vacation", "travel", "visit", "passport",
];

const ROAD = [
  "road", "street", "lane", "avenue", "bridge", "tunnel", "crosswalk", "signal",
  "light", "truck", "car", "van", "bike", "wheel", "brake", "engine",
  "mirror", "seat", "route", "corner", "block", "alley", "plaza", "station",
];

const CITY = [
  "city", "town", "village", "market", "store", "shop", "mall", "bank",
  "school", "park", "garden", "library", "museum", "theater", "stadium", "clinic",
  "hospital", "office", "tower", "plaza", "square", "bridge", "fountain", "monument",
];

const FARM = [
  "farm", "barn", "stable", "field", "tractor", "hay", "grain", "corn",
  "wheat", "oats", "pig", "cow", "calf", "hen", "rooster", "chick",
  "goose", "duck", "mule", "donkey", "pasture", "fence", "silo", "harvest",
];

const NATURE = [
  "nature", "wild", "trail", "camp", "creek", "grove", "forest", "leaf",
  "root", "stone", "bark", "twig", "nest", "feather", "acorn", "pinecone",
  "mushroom", "river", "brook", "meadow", "sunlight", "moonlight", "shadow", "echo",
];

const TIME_WORDS = [
  "time", "day", "night", "week", "month", "year", "hour", "minute",
  "second", "today", "tomorrow", "morning", "noon", "evening", "midnight", "season",
  "spring", "summer", "autumn", "winter", "weekend", "holiday", "moment", "future",
];

const FEELINGS = [
  "happy", "sad", "calm", "brave", "proud", "shy", "kind", "gentle",
  "eager", "ready", "quiet", "loud", "cheery", "jolly", "silly", "curious",
  "sleepy", "grumpy", "steady", "clever", "fair", "honest", "friendly", "thankful",
];

const ACTIONS_ONE = [
  "run", "walk", "jump", "hop", "skip", "slide", "climb", "crawl",
  "swim", "dive", "float", "glide", "ride", "drive", "push", "pull",
  "carry", "lift", "drop", "throw", "catch", "kick", "spin", "twist",
];

const ACTIONS_TWO = [
  "read", "write", "draw", "paint", "build", "make", "cook", "bake",
  "wash", "clean", "sweep", "mop", "fold", "sew", "plant", "grow",
  "dig", "rake", "water", "spray", "wrap", "pack", "open", "close",
];

const ACTIONS_THREE = [
  "look", "watch", "see", "hear", "listen", "smile", "laugh", "sing",
  "dance", "clap", "wave", "nod", "wink", "blink", "think", "learn",
  "teach", "share", "help", "solve", "guess", "count", "sort", "stack",
];

const ADJECTIVES_ONE = [
  "big", "small", "tall", "short", "long", "tiny", "giant", "quick",
  "slow", "fast", "bright", "dark", "early", "late", "young", "old",
  "new", "fresh", "sweet", "plain", "fancy", "simple", "basic", "neat",
];

const ADJECTIVES_TWO = [
  "smart", "wise", "funny", "witty", "soft", "hard", "firm", "round",
  "flat", "wide", "narrow", "deep", "shallow", "clear", "cloudy", "rainy",
  "sunny", "windy", "frosty", "golden", "silver", "wooden", "linen", "velvet",
];

const ADJECTIVES_THREE = [
  "busy", "lazy", "tidy", "messy", "lively", "steady", "gentle", "noble",
  "royal", "rural", "urban", "local", "global", "frozen", "mellow", "crispy",
  "juicy", "spicy", "salty", "buttery", "cheesy", "minty", "zesty", "toasty",
];

const JOBS = [
  "chef", "baker", "farmer", "pilot", "driver", "nurse", "doctor", "teacher",
  "artist", "singer", "actor", "dancer", "writer", "painter", "builder", "plumber",
  "carpenter", "electrician", "guard", "judge", "clerk", "cashier", "barber", "florist",
];

const HOLIDAY_WORDS = [
  "party", "gift", "card", "candle", "cake", "cookie", "feast", "parade",
  "picnic", "firework", "lantern", "ribbon", "wreath", "bell", "carol", "family",
  "guest", "host", "smile", "cheer", "laugh", "hug", "wish", "celebrate",
];

const WORD_BANK = Array.from(
  new Set([
    ...COLORS,
    ...ANIMALS,
    ...MORE_ANIMALS,
    ...BIRDS,
    ...SEA_LIFE,
    ...INSECTS,
    ...FRUITS,
    ...VEGETABLES,
    ...FOODS,
    ...DRINKS,
    ...PLANTS,
    ...TREES,
    ...FLOWERS,
    ...WEATHER,
    ...LANDSCAPES,
    ...WATER_WORDS,
    ...SKY_SPACE,
    ...ROOMS,
    ...HOUSE_ITEMS,
    ...KITCHEN,
    ...BEDROOM,
    ...BATH_LAUNDRY,
    ...FURNITURE,
    ...CLOTHES,
    ...BODY,
    ...SCHOOL,
    ...OFFICE,
    ...TOOLS,
    ...SHAPES,
    ...MATERIALS,
    ...TEXTURES,
    ...SPORTS,
    ...MUSIC,
    ...ART,
    ...TOYS,
    ...TRAVEL,
    ...ROAD,
    ...CITY,
    ...FARM,
    ...NATURE,
    ...TIME_WORDS,
    ...FEELINGS,
    ...ACTIONS_ONE,
    ...ACTIONS_TWO,
    ...ACTIONS_THREE,
    ...ADJECTIVES_ONE,
    ...ADJECTIVES_TWO,
    ...ADJECTIVES_THREE,
    ...JOBS,
    ...HOLIDAY_WORDS,
  ])
);

export { WORD_BANK };
export const WORD_BANK_SIZE = WORD_BANK.length;
