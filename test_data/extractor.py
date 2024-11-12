#a bunch of code I found online and stitched together to quickly generate large amounts of crop data JSON

import json
import random
from datetime import datetime, timedelta
from re import search
from types import SimpleNamespace

# Read input file of crop names
with open('croplist.txt', 'r') as f:
    lines = f.readlines()

# Initialize crops list
CROPS = []

# Function to generate random date between 2015 and 2025
def random_date():
    start_date = datetime(2015, 1, 1)
    end_date = datetime(2025, 12, 31)
    days = (end_date - start_date).days
    random_days = random.randint(0, days)
    #properly format it into 08/22/2024 or MM/DD/YYYY
    return (start_date + timedelta(days=random_days)).strftime('%m/%d/%Y')

# Function to pluralize a word
def pluralize(word):
    # store some common words that don't change or change in a unique way
    IRREGULARS = {
        "child": "children",
        "foot": "feet",
        "goose": "geese",
        "man": "men",
        "louse": "lice",
        "mouse": "mice",
        "die": "dice",
        "ox": "oxen",
        "person": "people",
        "tooth": "teeth",
        "woman": "women",
    }
    SAME_FORM = [
        "bison",
        "buffalo",
        "deer",
        "fish",
        "moose",
        "pike",
        "plankton",
        "salmon",
        "shrimp",
        "sheep",
        "swine",
        "trout",
        "tuna",
    ]
    # store the common endings for plural worlds
    ENDINGS = SimpleNamespace(
        **{
            "DEFAULT": "s",
            "SPECIAL": "es",
            "SUPERSPECIAL": "i",
        }
    )
    #store example words for:
    #words that end in 'o' and must be pluralized to 'oes'
    ES_OS = ["potato", "tomato", "hero", "echo", "torpedo", "veto"]
    #words that end in 'f' and must be pluralized to 'ves'
    F_V_WORDS = ["wolf", "elf", "loaf", "thief", "leaf", "knife", "life", "wife", "calf"]
    #words that end in 'z' and must be pluralized to 'zes'
    L_REPEATERS = ["buzz", "fizz", "fuzz", "jazz", "quiz"]

    #make the word lowercase to prevent issues
    word = word.lower()

    #check for special case words defined above
    if word in IRREGULARS:
        return IRREGULARS[word]

    if word in SAME_FORM:
        return word

    # Some words repeat the last letter in their plural form
    if word in L_REPEATERS:
        word += word[-1]

    # Words ending in us -> change us to i
    if search(r"us$", word):
        return word[:-2] + ENDINGS.SUPERSPECIAL

    # Words ending in is -> change is to es
    if search(r"is$", word):
        return word[:-2] + ENDINGS.SPECIAL

    # Words ending in x, s, z, ch, sh -> add es
    if search(r"[xsxz]$", word) or search(r"[cs]h$", word):
        return word + ENDINGS.SPECIAL

    # Words ending in y with a consonant before it -> change y to i and add es
    if search(r"[^aeiou]y$", word):
        return word[:-1] + "i" + ENDINGS.SPECIAL

    # Words ending in y with a vowel before it -> add s
    if search(r"[aeiou]y$", word):
        return word + ENDINGS.DEFAULT

    # Words ending in o -> add s generally, but add es for ES_OS words
    if search(r"o$", word):
        if word in ES_OS:
            return word + ENDINGS.SPECIAL
        return word + ENDINGS.DEFAULT

    # Words ending in fe -> change fe to v and add es
    if search(r"fe$", word):
        return word[:-2] + "v" + ENDINGS.SPECIAL

    # Words ending in f or ff -> add S, but change f to v for F_V_WORDS
    if search(r"ff?$", word):
        if word in F_V_WORDS:
            return word[:-1] + "v" + ENDINGS.SPECIAL
        return word + ENDINGS.DEFAULT

    # If all else fails, just add s
    return word + ENDINGS.DEFAULT

# Generate random media from list of values on the client's farm
def random_media():
    return random.choice(["in ground", "hugel mound", "raised bed", "container", "aquaponic"])

# Generate random location from list of values on the client's farm
def random_location():
    hugel_mounds = ['Hugel Mound #1', 'Hugel Mound #2']
    greenhouses = ['Greenhouse #1', 'Greenhouse #2', 'Greenhouse #3', 'Greenhouse #4']
    fields = ['Field #1', 'Field #2', 'Field #3', 'Field #4', 'Field #5']
    orchards = ['Orchard #1', 'Orchard #2', 'Orchard #3']
    return random.choice(hugel_mounds + greenhouses + fields + orchards + ['Garden patch', 'Yard', 'Cold frame', 'Indoor'])

# Generate random variety from list of plausible values
def random_variety():
    return random.choice(["standard", "beefsteak", "little finger", "green", "black", "tall", "heirloom"])

# Generate random source from list of plausible values
def random_source():
    return random.choice(["personal cutting", "cutting from friend", "burpee", "johnny's selected seeds", "ferry-morse", "walmart", "home depot", "amazon"])

# Generate random yield number between 0 and 20 (2 decimal places)
def random_yield():
    return round(random.uniform(0, 20), 2)
    
# Function to generate random comments from an array of sentences
def generate_comments():
    sentences = [
        "None.",
        "Nothing for now.",
        "This crop is doing exceptionally well.",
        "I've noticed some pests on a few plants, but overall it's healthy.",
        "The weather has been rough on this crop lately.",
        "I'm experimenting with a new fertilizer on this batch.",
        "The growth rate seems slower than expected.",
        "I'm considering trying a different planting method next season.",
        "There's a lot of potential for improvement in this area.",
        "I'm excited to see how this crop develops over time.",
        "The soil quality needs some attention for better results.",
        "I've been closely monitoring the watering schedule for optimal growth.",
        "The harvest from this crop was quite bountiful.",
        "I've had some success with companion planting techniques here.",
        "The color and texture of the leaves are vibrant and healthy.",
        "I'm planning to expand this crop in the near future.",
        "There are signs of nutrient deficiencies in some plants.",
        "I've been experimenting with different pruning techniques to promote growth.",
        "The plants seem to be responding well to the recent increase in sunlight.",
        "There's been some signs of disease, so I've been applying organic treatments.",
        "I've been documenting the development stages of this crop for research purposes.",
        "The aroma from the flowers is delightful and attracts beneficial insects.",
        "I'm considering introducing some companion plants to improve soil fertility.",
        "Despite some initial setbacks, the crop is showing signs of resilience.",
        "I've been closely monitoring the pH levels of the soil to ensure optimal conditions."
    ]
    
    #Randomly join 1 to 4 of the above sentences together for the comment.
    num_sentences = random.randint(1, 4)
    return ' '.join(random.sample(sentences, num_sentences))

# Iterate through each line in the input file
for line in lines:
    # Strip whitespace and split by spaces
    words = line.strip().split()

    # Generate the label and name based on the crops in the wordlist and randomly pluralize it
    label = ' '.join(words)
    plural_choice = random.randint(1, 2)
    if plural_choice == 1:  #singular
        name = label
    else:  #plural
        # Generate plural label
        plural_label = ' '.join(words[:-1])
        plural_label = plural_label + ' ' + pluralize(words[-1]).capitalize()
        label = plural_label.strip()
        name = label

    # Create 1 to 5 entries per crop; ends up with about 875 entries
    for _ in range(random.randint(1, 5)):
        hrfNum = str(random.randint(1, 999999)).zfill(6) # Generate 6 digit number with prepended 0s
        media = random_media()
        location = random_location()
        variety = random_variety()
        source = random_source()
        yield_amount = f"{random_yield()} kg/ha" # Appends the units of kilograms per hectares
        crop_type = random.choice(['annual', 'perennial', 'biennial'])
        active = random.choice(['Yes', 'No'])
        indoors = random.choice(['Yes', 'No'])
        visible = random.choice(['Yes', 'No'])
        date_planted = random_date()
        comment = generate_comments()        
        
        # Create crop dictionary
        crop = {
            'label': label,
            'name': name,
            'active': active,
            'location': location,
            'variety': variety,
            'source': source,
            'datePlanted': date_planted,
            'comments': comment,
            'indoors': indoors,
            'type': crop_type,
            'medium': media,
            'hrfNum': hrfNum,
            'visible': visible,
            'yield': yield_amount,
        }

        print(crop)

        # Append crop to CROPS list
        CROPS.append(crop)

# Write output JSON to file
with open('testCropData.json', 'w') as f:
    json.dump(CROPS, f, indent=4)