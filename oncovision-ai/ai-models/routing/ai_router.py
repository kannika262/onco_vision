def detect_scan_type(filename):

    filename = filename.lower()

    if "brain" in filename or "mri" in filename:

        return "brain"

    elif "lung" in filename or "xray" in filename:

        return "lung"

    else:

        return "brain"