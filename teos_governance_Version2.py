"""
Idea 3: Teos Coin Governance and Rewards System
- Auto-creates a residents database, calculates benefits, and enables voting or initiative proposals based on Teos holdings.
"""

import json
import os

RESIDENTS_DB = "residents.json"

def fetch_or_create_residents():
    if not os.path.exists(RESIDENTS_DB):
        residents = [
            {"id": 1, "name": "Sara", "teos": 120},
            {"id": 2, "name": "Omar", "teos": 60}
        ]
        with open(RESIDENTS_DB, "w") as f:
            json.dump(residents, f)
    else:
        with open(RESIDENTS_DB) as f:
            residents = json.load(f)
    return residents

def benefits(teos):
    if teos >= 100:
        return "20% discount, priority access, propose initiatives, vote"
    elif teos >= 51:
        return "15% discount, special events, vote"
    elif teos >= 11:
        return "10% discount, monthly rewards"
    else:
        return "5% discount"

def main():
    print("Auto-fetching or creating residents database...")
    residents = fetch_or_create_residents()
    for r in residents:
        print(f"{r['name']}: {r['teos']} Teos → Benefits: {benefits(r['teos'])}")
    # Voting or proposing features based on balance
    name = input("Enter your name to vote or propose (demo): ")
    resident = next((r for r in residents if r["name"] == name), None)
    if resident:
        if resident["teos"] >= 50:
            print("You have voting rights!")
        if resident["teos"] >= 100:
            print("You can propose a new initiative!")
    else:
        print("Resident not found!")

if __name__ == "__main__":
    main()