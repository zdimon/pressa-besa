import subprocess
import binascii


def format_bstr(line):
    line = str(line)
    line = line.replace('\\n', ' ')
    line = line.replace('b"', ' ')
    line = line.replace("b'", ' ')
    print(line)
    return line


def normalize_email(email):
    return email.replace('@', '---')


def run_command(command):
    process = subprocess.Popen(command.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    return {"output": format_bstr(output), "error": error}
