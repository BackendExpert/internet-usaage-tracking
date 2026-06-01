import time
from api import get_active_users, send_usage
from generator import generate_usage
from config import INTERVAL_SECONDS

def run():
    print("ISP Simulator started...")

    while True:
        users = get_active_users()

        if not users:
            print("No users found")
            time.sleep(INTERVAL_SECONDS)
            continue

        for user in users:
            usage = generate_usage(user)
            send_usage(usage)

            print(f"Sent usage: {usage}")

        time.sleep(INTERVAL_SECONDS)

if __name__ == "__main__":
    run()