"""
Idea 2: Biometric Payments with Teos Currency
- Auto-creates or fetches a user database, verifies users by fingerprint, and deducts Teos upon payment.
"""

import json
import os

USERS_DB = "users.json"

def fetch_or_create_users():
    if not os.path.exists(USERS_DB):
        # Example: Fetch users from API or create demo data
        users = [{"id": 1, "name": "Ahmad", "fingerprint": "AABBCC", "teos": 50}]
        with open(USERS_DB, "w") as f:
            json.dump(users, f)
    else:
        with open(USERS_DB) as f:
            users = json.load(f)
    return users

def identify_user(fingerprint, users):
    for u in users:
        if u["fingerprint"] == fingerprint:
            return u
    return None

def process_payment(user, amount):
    if user["teos"] >= amount:
        user["teos"] -= amount
        print(f"Payment complete! New balance: {user['teos']}")
    else:
        print("Insufficient Teos balance!")
    with open(USERS_DB, "w") as f:
        json.dump(users, f)

def main():
    print("Auto-fetching or creating users database...")
    global users
    users = fetch_or_create_users()
    fingerprint = input("Enter user's fingerprint (demo): ")
    user = identify_user(fingerprint, users)
    if user:
        print(f"Welcome {user['name']}! Your Teos balance: {user['teos']}")
        amount = int(input("Enter payment amount: "))
        process_payment(user, amount)
    else:
        print("User not found!")

if __name__ == "__main__":
    main()