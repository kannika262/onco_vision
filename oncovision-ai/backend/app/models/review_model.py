from sqlalchemy import Column, Integer, String
from app.database.db import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    doctor_name = Column(String)
    feedback = Column(String)