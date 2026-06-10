import os
import glob

# Files to update
files = glob.glob('app/**/*.tsx', recursive=True) + glob.glob('components/**/*.tsx', recursive=True)

# Replace text-[#c8a96e] with text-[#a68038] dark:text-[#c8a96e]
for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    old_content = content
    
    # We want to replace text-[#c8a96e] but be careful not to replace it if it's already followed by dark:text-[#c8a96e]
    # Simple replace is:
    content = content.replace('text-[#c8a96e] dark:text-[#c8a96e]', 'text-[#a68038] dark:text-[#c8a96e]') # catch existing duplicates if any
    
    # Replace normal instances
    # We don't want to replace text-[#c8a96e] if it's already text-[#a68038] dark:text-[#c8a96e]
    # So we'll replace text-[#c8a96e] -> text-[#a68038] dark:text-[#c8a96e]
    # Then fix any double replacements:
    content = content.replace('text-[#c8a96e]', 'text-[#a68038] dark:text-[#c8a96e]')
    content = content.replace('text-[#a68038] dark:text-[#a68038] dark:text-[#c8a96e]', 'text-[#a68038] dark:text-[#c8a96e]')
    
    # Same for border-[#c8a96e] if it's used as borders that need darkening
    content = content.replace('border-[#c8a96e] dark:border-[#c8a96e]', 'border-[#a68038] dark:border-[#c8a96e]')
    content = content.replace('border-[#c8a96e]', 'border-[#a68038] dark:border-[#c8a96e]')
    content = content.replace('border-[#a68038] dark:border-[#a68038] dark:border-[#c8a96e]', 'border-[#a68038] dark:border-[#c8a96e]')
    
    if content != old_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")

print("Done darkening gold colors.")
