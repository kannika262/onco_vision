import torch


# =========================================
# FEDERATED AVERAGING
# =========================================

def federated_average(state_dicts):

    """
    Average weights from multiple hospitals
    """

    avg_state_dict = {}

    for key in state_dicts[0].keys():

        avg_state_dict[key] = sum(

            state_dict[key]

            for state_dict in state_dicts

        ) / len(state_dicts)

    return avg_state_dict