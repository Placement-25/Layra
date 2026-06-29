# Document Store Module for LAYRA

DEFAULT_CORPUS = [
    {
        "id": "doc_battery_1",
        "title": "Lithium-Ion Battery Failure Modes and Mitigations",
        "category": "Battery Technology",
        "url": "https://energy.gov/battery-safety-handbook",
        "content": (
            "Lithium-ion battery failure modes primarily include thermal runaway, dendrite formation, "
            "and SEI (Solid Electrolyte Interphase) layer degradation. Thermal runaway occurs when internal "
            "heat generation exceeds heat dissipation. Dendrite formation occurs during fast charging at low "
            "temperatures, causing lithium fibers to bridge the separator and short-circuit the cell. "
            "Mitigations include precise thermal management, advanced cell balancing, and electrolyte selection."
        )
    },
    {
        "id": "doc_battery_2",
        "title": "Advanced Charging Protocols and Safety Standards",
        "category": "Battery Technology",
        "url": "https://standards.org/iec-62133-battery-safety",
        "content": (
            "Safety standards like IEC 62133 specify operating boundaries for lithium batteries. Charging at high "
            "voltages (above 4.2V per cell) accelerates capacity fade and increases thermal runaway risk. Active "
            "cooling systems and multi-step constant current charging reduce mechanical stress and temperature rise."
        )
    },
    {
        "id": "doc_finance_1",
        "title": "AutoML Time-Series Forecasting for Financial Markets",
        "category": "Finance & Markets",
        "url": "https://arxiv.org/abs/automl-finance-forecasting",
        "content": (
            "Predictive analysis in financial markets increasingly relies on AutoML frameworks that automatically "
            "select architectures (e.g., LSTMs, GRUs) and perform hyperparameter tuning. These systems ingest "
            "macroeconomic indicators, historical prices, and order-book data to predict market trends. "
            "Evaluation metrics like Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE) determine accuracy."
        )
    },
    {
        "id": "doc_finance_2",
        "title": "Predictive Revenue and Churn Modelling",
        "category": "Finance & Markets",
        "url": "https://businessinsights.com/revenue-churn-prediction",
        "content": (
            "Business intelligence platforms utilize predictive models to adjust for seasonal demand and forecast "
            "customer churn. By analyzing behavioral metrics and purchasing patterns, AutoML models calculate "
            "retention probability and optimize customer lifetime value (LTV)."
        )
    },
    {
        "id": "doc_legal_1",
        "title": "Data Privacy Compliance (GDPR & CCPA)",
        "category": "Legal & Compliance",
        "url": "https://gdpr-info.eu/compliance-framework",
        "content": (
            "The General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA) mandate strict "
            "data privacy rules. Violations, such as unauthorized sharing or data leaks, carry penalty ranges "
            "up to 4% of global annual turnover or $20 million. Compliance audits require automated lineage tracking "
            "and user consent management systems."
        )
    },
    {
        "id": "doc_medical_1",
        "title": "Safety Guidelines for Medical Implant Battery Systems",
        "category": "Healthcare & Medicine",
        "url": "https://fda.gov/medical-devices-implant-safety",
        "content": (
            "Medical implants such as pacemakers and neurostimulators require highly stable battery chemistry. "
            "Lithium-carbon monofluoride/silver vanadium oxide (CFx/SVO) is favored for longevity. Clinical safety "
            "standards mandate hermetic sealing, biocompatibility tests, and ultra-low leakage currents to prevent "
            "tissue damage or device failure."
        )
    }
]

class DocumentStore:
    def __init__(self):
        self.documents = list(DEFAULT_CORPUS)
        self.custom_count = 0

    def add_document(self, title, category, content, url=None):
        """Adds a document dynamically to the RAG database."""
        if not title or not category or not content:
            raise ValueError("Title, category, and content are required.")
        
        self.custom_count += 1
        doc_id = f"custom_doc_{self.custom_count}"
        
        doc = {
            "id": doc_id,
            "title": title.strip(),
            "category": category.strip(),
            "url": url.strip() if url else "#",
            "content": content.strip()
        }
        self.documents.append(doc)
        return doc

    def get_all_documents(self):
        """Returns all documents."""
        return self.documents

# Instantiate global document store
store = DocumentStore()
