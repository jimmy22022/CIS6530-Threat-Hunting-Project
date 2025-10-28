import os

# Folder setup. Creates a folder called Submission3_OpCodes on the desktop if it doesn't exist.
folder_path = "/home/kali/Desktop/Submission3_OpCodes"
if not os.path.exists(folder_path):
    os.makedirs(folder_path)

# Creates the output path for the exported opcode files.
program_name = currentProgram.getName()
output_path = os.path.join(folder_path, program_name + ".opcode")

# Get the list of instructions.
instructions = currentProgram.getListing().getInstructions(True)

# Debugging variable. If this is 0, then something went wrong.
count = 0

with open(output_path, "w") as f:
    while instructions.hasNext():
        instr = instructions.next()

        # Get the address in string form.
        addr_str = instr.getAddress().toString()

        # Get the bytes at this instruction.
        instr_bytes = instr.getBytes()
        byte_strs = []
        for b in instr_bytes:
            unsigned_val = b & 0xff
            byte_strs.append("%02X" % unsigned_val)
        bytes_field = " ".join(byte_strs)

        # Get the mnemonic.
        mnemonic = instr.getMnemonicString()

        # Get the operands.
        operand_texts = []
        for i in range(instr.getNumOperands()):
            operand_texts.append(instr.getDefaultOperandRepresentation(i))
        if operand_texts:
            assemblyInstruction = mnemonic + " " + ", ".join(operand_texts)
        else:
            assemblyInstruction = mnemonic

        # Build the output string as "address assemblyInstruction".
        line = addr_str + "\t" + bytes_field + "\t" + assemblyInstruction

        f.write(line + "\n")
        count += 1

print("Writing to:", output_path)
print("Wrote instruction lines:", count)
