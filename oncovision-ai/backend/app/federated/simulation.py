import os
import sys

import torch.nn as nn


# =========================================
# IMPORT MODEL
# =========================================

BASE_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../../"
    )
)

sys.path.append(
    os.path.join(
        BASE_DIR,
        "ai-models/brain"
    )
)

from brain_model import model

from client import FederatedClient
from server import FederatedServer


# =========================================
# FEDERATED SIMULATION
# =========================================

def run_federated_learning():

    print("\n================================")
    print("FEDERATED LEARNING STARTED")
    print("================================")

    # =====================================
    # GLOBAL MODEL
    # =====================================

    global_model = model

    # =====================================
    # CREATE HOSPITAL CLIENTS
    # =====================================

    hospital_1 = FederatedClient(

        "Hospital A",

        global_model

    )

    hospital_2 = FederatedClient(

        "Hospital B",

        global_model

    )

    hospital_3 = FederatedClient(

        "Hospital C",

        global_model

    )

    # =====================================
    # LOCAL TRAINING
    # =====================================

    weights_1 = hospital_1.local_train()

    weights_2 = hospital_2.local_train()

    weights_3 = hospital_3.local_train()

    # =====================================
    # SERVER AGGREGATION
    # =====================================

    server = FederatedServer(

        global_model
    )

    updated_model = server.aggregate_models([

        weights_1,

        weights_2,

        weights_3

    ])

    print("\n================================")
    print("FEDERATED LEARNING COMPLETED")
    print("================================")

    return updated_model


# =========================================
# RUN DIRECTLY
# =========================================

if __name__ == "__main__":

    run_federated_learning()