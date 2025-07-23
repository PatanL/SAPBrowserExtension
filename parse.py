import json

# 1. Load the original data
with open('pets.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 2. Build id → name mapping
id_to_name = {}
for tier_list in data.values():
    for entry in tier_list:
        # skip entries with missing or non-string IDs
        if 'id' in entry and entry['id'] and isinstance(entry['id'], str):
            id_to_name[entry['id']] = entry['name']

# 3. Rename the top‑level key from "Enu" to "name"
result = {
    "name": id_to_name
}

# 4. Write out
with open('output.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print("Wrote mapping to output.json under the key 'name'.")
