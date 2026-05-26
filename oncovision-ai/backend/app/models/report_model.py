from sqlalchemy import Column, Integer, String
from app.database.db import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String)
    scan_type = Column(String)
    prediction = Column(String)
    confidence = Column(String)
    report_path = Column(String)