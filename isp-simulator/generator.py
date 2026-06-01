import random

def genarate_usage(user):
    """
    Simulate realistic network usage per user
    """

    base = random.randint(1_000_000, 10_000_000)

    if user.get("plan") == "premium":
        base *= 3
    
    return {
        "userId": user["id"],
        "bytesUsed": base
    }