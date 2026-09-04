export  class CompilerService {
  static async compileAndRun(code, language, input = '') {
    const startTime = performance.now();
    
    try {
      // Map language to Piston API language names
      const pistonLangs = {
        'java': 'java',
        'python': 'python3',
        'c': 'c',
        'cpp': 'cpp',
        'javascript': 'javascript',
      };
      const lang = pistonLangs[language] || 'javascript';
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: lang,
          source: code,
          stdin: input
        })
      });
      if (!response.ok) {
        console.error('Piston API error:', response.status, response.statusText);
        throw new Error(`Piston API error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      const output = (result.run && result.run.output) ? result.run.output : '';
      const error = (result.run && result.run.stderr) ? result.run.stderr : '';
      return {
        success: !error,
        output: output || error,
        error: error,
        executionTime: Math.round(executionTime),
        memory: 'N/A',
        cpuTime: 'N/A',
        timeComplexity: this.analyzeTimeComplexity(code, language),
        spaceComplexity: this.analyzeSpaceComplexity(code, language)
      };
    } catch (error) {
      console.error('CompilerService (Piston) error:', error);
      return {
        success: false,
        output: '',
        error: `Compiler service unavailable. Please check your internet connection, CORS policy, or try again later. (Piston API)\n${error}`,
        executionTime: 0,
        memory: 'N/A',
        cpuTime: 'N/A',
        timeComplexity: 'N/A',
        spaceComplexity: 'N/A'
      };
    }
  }

  static getLanguageId(language) {
    const mapping = {
      'java': 'java',
      'python': 'python3',
      'c': 'c',
      'cpp': 'cpp17',
      'javascript': 'nodejs'
    };
    return mapping[language] || 'javascript';
  }

  static getVersionIndex(language) {
    const versions = {
      'java': '4',
      'python': '4',
      'c': '5',
      'cpp': '1',
      'javascript': '4'
    };
    return versions[language] || '0';
  }

  static analyzeTimeComplexity(code, language) {
    const patterns = {
      'O(1)': [
        /return\s+\w+(\[\d+\])?/,
        /\w+\s*=\s*\w+/,
        /if\s*\(/
      ],
      'O(log n)': [
        /while.*\/=\s*2/,
        /for.*\/=\s*2/,
        /binary.*search/i,
        /log/i
      ],
      'O(n)': [
        /for\s*\(.*length/,
        /while.*<.*length/,
        /\.forEach/,
        /for.*in.*range/
      ],
      'O(n log n)': [
        /sort\(/,
        /\.sort/,
        /mergeSort/i,
        /quickSort/i
      ],
      'O(n²)': [
        /for.*for/,
        /nested.*loop/i,
        /bubble.*sort/i
      ],
      'O(2^n)': [
        /fibonacci/i,
        /recursive.*exponential/i,
        /2\s*\*\*\s*n/
      ]
    };

    for (const [complexity, regexes] of Object.entries(patterns)) {
      if (regexes.some(regex => regex.test(code))) {
        return complexity;
      }
    }

    return 'O(?)';
  }

  static analyzeSpaceComplexity(code, language) {
    if (/new\s+\w+\[.*n.*\]/.test(code) || /\[\]\s*\*\s*n/.test(code)) {
      return 'O(n)';
    }
    if (/recursive/.test(code) && /fibonacci|factorial/.test(code)) {
      return 'O(n)';
    }
    if (/for.*for/.test(code) && /new\s+\w+\[/.test(code)) {
      return 'O(n²)';
    }
    return 'O(1)';
  }

  static getFallbackExecution(code, language, input) {
    try {
      if (language === 'javascript') {
        const result = eval(code);
        return {
          success: true,
          output: String(result),
          executionTime: Math.random() * 100 + 10,
          memory: '2.5 MB',
          cpuTime: '0.02s',
          timeComplexity: this.analyzeTimeComplexity(code, language),
          spaceComplexity: this.analyzeSpaceComplexity(code, language)
        };
      }
    } catch (error) {
      return {
        success: false,
        output: `Error: ${error.message}`,
        executionTime: 0,
        memory: 'N/A',
        cpuTime: 'N/A',
        timeComplexity: 'N/A',
        spaceComplexity: 'N/A'
      };
    }

    return {
      success: false,
      output: `Compiler service unavailable. Please add your JDoodle API credentials.`,
      executionTime: 0,
      memory: 'N/A',
      cpuTime: 'N/A',
      timeComplexity: this.analyzeTimeComplexity(code, language),
      spaceComplexity: this.analyzeSpaceComplexity(code, language)
    };
  }

  static getCodeTemplate(language) {
    const templates = {
      java: `public class Main {
    public static void main(String[] args) {
        // Your code here
        System.out.println("Hello World");
    }
}`,
      python: `# Your Python code here
def main():
    print("Hello World")

if __name__ == "__main__":
    main()`,
      c: `#include <stdio.h>

int main() {
    // Your C code here
    printf("Hello World\\n");
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    // Your C++ code here
    cout << "Hello World" << endl;
    return 0;
}`,
      javascript: `// Your JavaScript code here
function main() {
    console.log("Hello World");
}

main();`
    };
    return templates[language] || templates.javascript;
  }
}
 