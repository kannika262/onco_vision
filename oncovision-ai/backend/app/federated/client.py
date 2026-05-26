import copy

import torch

import torch.nn as nn
import torch.optim as optim


# =========================================
# LOCAL HOSPITAL TRAINING
# =========================================

class FederatedClient:

    def __init__(

        self,

        client_name,

        model

    ):

        self.client_name = client_name

        self.model = copy.deepcopy(model)

    # =====================================
    # SIMULATED LOCAL TRAINING
    # =====================================

    def local_train(self):

        print(

            f"\n{self.client_name} "

            f"started local training..."

        )

        # Dummy optimizer

        optimizer = optim.SGD(

            self.model.parameters(),

            lr=0.001

        )

        # Fake training step

        for param in self.model.parameters():

            param.data += torch.randn_like(

                param

            ) * 0.001

        print(

            f"{self.client_name} "

            f"completed training."
        )

        return self.model.state_dict()