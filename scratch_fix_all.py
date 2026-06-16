import os
import re

def remove_dark_classes(directory):
    # Regex to catch dark:text-[#c8a96e], dark:hover:text-something, dark:bg-black etc.
    # Note: Handles standard Tailwind classes properly.
    pattern = re.compile(r'dark:[a-zA-Z0-9_\-\[\]#(),.]+')
    
    count = 0
    for root, _, files in os.walk(directory):
        for file in files:
            if not file.endswith(('.tsx', '.ts')):
                continue
            
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = pattern.sub('', content)
            
            # Additional cleanup for gold colors, changing everything to #a68038
            # The exact target was "dark:text-[#c8a96e]" and we just removed the dark variants.
            # Clean up extra spaces left inside class names
            new_content = re.sub(r'\s+', ' ', new_content).strip()
            # The above .strip changes formatting entirely! Let's do better:
            
            pass

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # match dark:something including brackets
    # dark:[a-zA-Z0-9_\-\[\]#(),./]+
    # Let's just simply replace dark:[\w\-\[\]\#\(\)\.\/]+ with empty string
    new_content = re.sub(r'dark:[\w\-\[\]\#\(\)\.\/:]+', '', content)
    
    # fix any double spaces created
    new_content = new_content.replace('  ', ' ')
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    dirs = ['app', 'components']
    base_path = r'c:\Users\kechiregis\Desktop\Impacto\cerameka'
    modified_count = 0
    
    for d in dirs:
        dir_path = os.path.join(base_path, d)
        for root, _, files in os.walk(dir_path):
            for file in files:
                if file.endswith(('.tsx', '.ts')):
                    if clean_file(os.path.join(root, file)):
                        modified_count += 1
                        print(f"Cleaned {file}")
    
    print(f"Total modified files: {modified_count}")

if __name__ == '__main__':
    main()
