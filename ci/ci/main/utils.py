import subprocess


def normalize_email(email):
    return email.replace('@', '---')


def run_command(command):
    process = subprocess.Popen(command.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    return {"output": str(output), "error": error}
