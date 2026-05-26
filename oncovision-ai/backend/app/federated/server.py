from aggregator import federated_average


# =========================================
# FEDERATED SERVER
# =========================================

class FederatedServer:

    def __init__(self, global_model):

        self.global_model = global_model

    # =====================================
    # AGGREGATE WEIGHTS
    # =====================================

    def aggregate_models(

        self,

        local_weights

    ):

        print(

            "\nSERVER: Aggregating "

            "hospital models..."
        )

        averaged_weights = federated_average(

            local_weights
        )

        self.global_model.load_state_dict(

            averaged_weights
        )

        print(

            "SERVER: Global AI Model Updated."
        )

        return self.global_model