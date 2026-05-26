import os
from datetime import datetime, timedelta

from jose import jwt
from passlib.context import CryptContext

# =========================================
# PASSWORD HASHING
# =========================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# =========================================
# JWT CONFIG
# =========================================

SECRET_KEY = "oncovision_ai_secret_key"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


# =========================================
# HASH PASSWORD
# =========================================

def hash_password(password: str):

    return pwd_context.hash(password)


# =========================================
# VERIFY PASSWORD
# =========================================

def verify_password(

    plain_password: str,

    hashed_password: str

):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# =========================================
# CREATE JWT TOKEN
# =========================================

def create_access_token(

    data: dict,

    expires_delta: timedelta = None

):

    to_encode = data.copy()

    # =========================================
    # TOKEN EXPIRY
    # =========================================

    if expires_delta:

        expire = datetime.utcnow() + expires_delta

    else:

        expire = datetime.utcnow() + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode.update({

        "exp": expire

    })

    # =========================================
    # ENCODE JWT
    # =========================================

    encoded_jwt = jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM

    )

    return encoded_jwt


# =========================================
# SAMPLE LOGIN VALIDATION
# =========================================

def authenticate_user(

    username: str,

    password: str

):

    # =========================================
    # DEMO USERS
    # =========================================

    demo_users = {

        "doctor": {

            "username": "doctor",

            "hashed_password":
            hash_password("doctor123"),

            "role": "doctor"

        },

        "admin": {

            "username": "admin",

            "hashed_password":
            hash_password("admin123"),

            "role": "admin"

        }

    }

    user = demo_users.get(username)

    if not user:

        return None

    if not verify_password(

        password,

        user["hashed_password"]

    ):

        return None

    return user