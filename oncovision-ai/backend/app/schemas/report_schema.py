from pydantic import BaseModel


class ReportResponse(BaseModel):
    prediction: str
    confidence: str