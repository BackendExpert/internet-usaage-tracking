import requests
from config import BASEURL

# fetch users from nestjs backend
def get_active_users():
    try:
        res = requests.get(f"{BASEURL}/users/active")
        return res.json
    except Exception as e:
        print("Error Fetching users", e)
        return []
    

# Sending usage    
def send_usage(data):
    try:
        res = requests.post(f"{BASEURL}/usage/update", json=data)
        return res.status_code
    except Exception as e:
        print("Error sending usage:", e)
        return None