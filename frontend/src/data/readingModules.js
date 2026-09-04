const  readingModules = {
  'html-fundamentals': {
    title: 'HTML Fundamentals',
    duration: '30 min read',
    content: `
# HTML (HyperText Markup Language)

## Overview

HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.

## Table of Contents

1. [Basic Structure](#basic-structure)
2. [Elements and Tags](#elements-and-tags)
3. [Attributes](#attributes)
4. [Document Structure](#document-structure)
5. [Text Content](#text-content)
6. [Links](#links)
7. [Images](#images)
8. [Lists](#lists)
9. [Tables](#tables)
10. [Forms](#forms)
11. [Semantic HTML](#semantic-html)
12. [Best Practices](#best-practices)

## Basic Structure

Every HTML document has a basic structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>
\`\`\`

## Elements and Tags

HTML uses elements defined by tags:

\`\`\`html
<!-- Opening and closing tags -->
<tagname>Content</tagname>

<!-- Self-closing tags -->
<tagname />
\`\`\`

### Common Elements

\`\`\`html
<!-- Headings -->
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>

<!-- Paragraphs -->
<p>This is a paragraph of text.</p>

<!-- Line breaks -->
<br />

<!-- Divisions -->
<div>This is a division</div>

<!-- Spans -->
<span>This is an inline span</span>
\`\`\`

## Attributes

Attributes provide additional information about elements:

\`\`\`html
<tagname attribute="value">Content</tagname>

<!-- Examples -->
<p class="highlight">Highlighted paragraph</p>
<div id="main-content">Main content area</div>
<a href="https://example.com" target="_blank">External link</a>
\`\`\`

### Global Attributes

\`\`\`html
<!-- Common global attributes -->
<div class="container" id="main" title="Main container">
  <p style="color: red;" data-info="custom data">
    Text content
  </p>
</div>
\`\`\`

## Document Structure

### Head Section

\`\`\`html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page description">
    <meta name="keywords" content="html, tutorial, web development">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js"></script>
</head>
\`\`\`

### Body Section

\`\`\`html
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <article>
                <h1>Article Title</h1>
                <p>Article content...</p>
            </article>
        </section>
        
        <aside>
            <h2>Sidebar</h2>
            <p>Sidebar content...</p>
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2024 Your Website</p>
    </footer>
</body>
\`\`\`

## Text Content

### Headings

\`\`\`html
<h1>Level 1 Heading</h1>
<h2>Level 2 Heading</h2>
<h3>Level 3 Heading</h3>
<h4>Level 4 Heading</h4>
<h5>Level 5 Heading</h5>
<h6>Level 6 Heading</h6>
\`\`\`

### Text Formatting

\`\`\`html
<!-- Emphasis and importance -->
<em>Emphasized text</em>
<strong>Important text</strong>

<!-- Bold and italic -->
<b>Bold text</b>
<i>Italic text</i>

<!-- Other formatting -->
<mark>Highlighted text</mark>
<small>Small text</small>
<del>Deleted text</del>
<ins>Inserted text</ins>
<sub>Subscript</sub>
<sup>Superscript</sup>

<!-- Code -->
<code>inline code</code>
<pre>
    Preformatted text
    preserves spaces and line breaks
</pre>
\`\`\`

### Quotations

\`\`\`html
<!-- Block quote -->
<blockquote cite="https://example.com">
    <p>This is a long quotation that spans multiple lines.</p>
    <footer>— Author Name</footer>
</blockquote>

<!-- Inline quote -->
<p>As they say, <q>HTML is the backbone of the web</q>.</p>
\`\`\`

## Links

\`\`\`html
<!-- External link -->
<a href="https://example.com" target="_blank" rel="noopener">External Link</a>

<!-- Internal link -->
<a href="page.html">Internal Link</a>

<!-- Anchor link -->
<a href="#section1">Jump to Section 1</a>

<!-- Email link -->
<a href="mailto:contact@example.com">Send Email</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call Us</a>

<!-- Download link -->
<a href="document.pdf" download>Download PDF</a>
\`\`\`

## Images

\`\`\`html
<!-- Basic image -->
<img src="image.jpg" alt="Description of image">

<!-- Image with additional attributes -->
<img src="image.jpg" 
     alt="Description" 
     width="300" 
     height="200" 
     loading="lazy">

<!-- Figure with caption -->
<figure>
    <img src="image.jpg" alt="Description">
    <figcaption>Image caption goes here</figcaption>
</figure>

<!-- Responsive images -->
<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <source media="(min-width: 400px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Responsive image">
</picture>
\`\`\`

## Lists

### Unordered Lists

\`\`\`html
<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item
        <ul>
            <li>Nested item 1</li>
            <li>Nested item 2</li>
        </ul>
    </li>
</ul>
\`\`\`

### Ordered Lists

\`\`\`html
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>

<!-- With different numbering -->
<ol type="A">
    <li>Item A</li>
    <li>Item B</li>
</ol>

<ol start="5">
    <li>Item 5</li>
    <li>Item 6</li>
</ol>
\`\`\`

### Description Lists

\`\`\`html
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
    
    <dt>JavaScript</dt>
    <dd>Programming language for web browsers</dd>
</dl>
\`\`\`

## Tables

\`\`\`html
<table>
    <caption>Monthly Sales Data</caption>
    <thead>
        <tr>
            <th>Month</th>
            <th>Sales</th>
            <th>Growth</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>January</td>
            <td>$10,000</td>
            <td>5%</td>
        </tr>
        <tr>
            <td>February</td>
            <td>$12,000</td>
            <td>20%</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Total</td>
            <td>$22,000</td>
            <td>12.5%</td>
        </tr>
    </tfoot>
</table>
\`\`\`

### Table with Merged Cells

\`\`\`html
<table>
    <tr>
        <th colspan="2">Q1 Results</th>
    </tr>
    <tr>
        <td>Revenue</td>
        <td>$50,000</td>
    </tr>
    <tr>
        <td rowspan="2">Expenses</td>
        <td>$20,000</td>
    </tr>
    <tr>
        <td>$15,000</td>
    </tr>
</table>
\`\`\`

## Forms

\`\`\`html
<form action="/submit" method="post">
    <!-- Text inputs -->
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" minlength="8">
    
    <!-- Textarea -->
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" cols="50"></textarea>
    
    <!-- Select dropdown -->
    <label for="country">Country:</label>
    <select id="country" name="country">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
    </select>
    
    <!-- Radio buttons -->
    <fieldset>
        <legend>Gender:</legend>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">Male</label>
        
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">Female</label>
    </fieldset>
    
    <!-- Checkboxes -->
    <input type="checkbox" id="newsletter" name="newsletter" value="yes">
    <label for="newsletter">Subscribe to newsletter</label>
    
    <!-- File upload -->
    <label for="file">Upload file:</label>
    <input type="file" id="file" name="file" accept=".jpg,.png,.pdf">
    
    <!-- Submit button -->
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
</form>
\`\`\`

### Advanced Form Elements

\`\`\`html
<!-- Number input -->
<input type="number" min="1" max="100" step="1" value="50">

<!-- Date inputs -->
<input type="date" name="birthdate">
<input type="time" name="appointment">
<input type="datetime-local" name="meeting">

<!-- Range slider -->
<input type="range" min="0" max="100" value="50">

<!-- Color picker -->
<input type="color" value="#ff0000">

<!-- Search -->
<input type="search" placeholder="Search...">

<!-- URL -->
<input type="url" placeholder="https://example.com">

<!-- Tel -->
<input type="tel" placeholder="+1-555-123-4567">
\`\`\`

## Semantic HTML

Semantic HTML uses elements that convey meaning:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Semantic HTML Example</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="hero">
            <h1>Welcome to Our Website</h1>
            <p>This is the main heading section.</p>
        </section>
        
        <section id="content">
            <article>
                <header>
                    <h2>Article Title</h2>
                    <p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
                </header>
                
                <p>Article content goes here...</p>
                
                <footer>
                    <p>Author: John Doe</p>
                </footer>
            </article>
            
            <aside>
                <h3>Related Links</h3>
                <nav>
                    <ul>
                        <li><a href="#link1">Related Article 1</a></li>
                        <li><a href="#link2">Related Article 2</a></li>
                    </ul>
                </nav>
            </aside>
        </section>
    </main>
    
    <footer>
        <address>
            Contact us at <a href="mailto:info@example.com">info@example.com</a>
        </address>
        <p><small>&copy; 2024 Company Name. All rights reserved.</small></p>
    </footer>
</body>
</html>
\`\`\`

### Semantic Elements

\`\`\`html
<!-- Structural elements -->
<header>Page or section header</header>
<nav>Navigation links</nav>
<main>Main content area</main>
<section>Thematic grouping of content</section>
<article>Self-contained content</article>
<aside>Sidebar content</aside>
<footer>Page or section footer</footer>

<!-- Content elements -->
<figure>Image with caption</figure>
<figcaption>Caption for figure</figcaption>
<details>Collapsible content</details>
<summary>Summary for details</summary>
<mark>Highlighted text</mark>
<time datetime="2024-01-15">January 15, 2024</time>
<address>Contact information</address>
\`\`\`

## Best Practices

### 1. Use Semantic HTML

\`\`\`html
<!-- Good: Semantic -->
<article>
    <h1>Article Title</h1>
    <p>Article content...</p>
</article>

<!-- Avoid: Non-semantic -->
<div class="article">
    <div class="title">Article Title</div>
    <div class="content">Article content...</div>
</div>
\`\`\`

### 2. Always Include Alt Text for Images

\`\`\`html
<!-- Good -->
<img src="chart.png" alt="Sales increased 25% from Q1 to Q2">

<!-- Bad -->
<img src="chart.png" alt="">
<img src="chart.png">
\`\`\`

### 3. Use Proper Heading Hierarchy

\`\`\`html
<!-- Good -->
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Bad -->
<h1>Main Title</h1>
<h3>Section Title</h3> <!-- Skipped h2 -->
\`\`\`

### 4. Associate Labels with Form Controls

\`\`\`html
<!-- Good -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- Also good -->
<label>
    Email:
    <input type="email" name="email">
</label>
\`\`\`

### 5. Use ARIA When Needed

\`\`\`html
<!-- For complex interactions -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" aria-hidden="true">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
</ul>

<!-- For landmark roles -->
<div role="banner">Header content</div>
<div role="navigation">Navigation content</div>
<div role="main">Main content</div>
\`\`\`

### 6. Validate Your HTML

Use the W3C Markup Validator to check for errors:
- [W3C Markup Validator](https://validator.w3.org/)

### 7. Write Clean, Readable Code

\`\`\`html
<!-- Good: Properly indented and organized -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
</head>
<body>
    <header>
        <h1>Site Title</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>Section Title</h2>
            <p>Section content...</p>
        </section>
    </main>
</body>
</html>
\`\`\`

## Common Mistakes to Avoid

1. **Not using DOCTYPE**: Always include \`<!DOCTYPE html>\`
2. **Missing lang attribute**: Include \`lang="en"\` on html element
3. **Not closing tags**: Ensure all tags are properly closed
4. **Using deprecated elements**: Avoid \`<font>\`, \`<center>\`, etc.
5. **Inline styles**: Use CSS files instead of style attributes
6. **Not validating**: Always validate your HTML

## HTML5 Features

### New Input Types

\`\`\`html
<input type="email" placeholder="Enter your email">
<input type="url" placeholder="Enter website URL">
<input type="tel" placeholder="Enter phone number">
<input type="date">
<input type="color">
<input type="range" min="0" max="100">
<input type="search" placeholder="Search...">
\`\`\`

### Media Elements

\`\`\`html
<!-- Video -->
<video controls width="640" height="360">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    Your browser does not support video playback.
</video>

<!-- Audio -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    Your browser does not support audio playback.
</audio>
\`\`\`

### Canvas and SVG

\`\`\`html
<!-- Canvas for graphics -->
<canvas id="myCanvas" width="400" height="200">
    Your browser does not support canvas.
</canvas>

<!-- SVG for vector graphics -->
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="red" />
</svg>
\`\`\`

## Summary

HTML is the foundation of web development. Key points to remember:

- Use semantic elements for better accessibility and SEO
- Always include proper DOCTYPE and meta tags
- Validate your HTML regularly
- Keep your code clean and well-organized
- Use appropriate elements for their intended purpose
- Include alt text for images
- Associate labels with form controls
- Test in multiple browsers

## External Resources

- [MDN HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3C HTML Specification](https://www.w3.org/TR/html52/)
- [HTML Validator](https://validator.w3.org/)
- [Can I Use](https://caniuse.com/) - Browser support tables
    `,
    quiz: [
      {
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Markup Language'],
        correct: 0
      },
      {
        question: 'Which element is used for the largest heading?',
        options: ['<h6>', '<h1>', '<header>', '<heading>'],
        correct: 1
      },
      {
        question: 'What is the correct way to create a link to another page?',
        options: ['<a url="page.html">Link</a>', '<link href="page.html">Link</link>', '<a href="page.html">Link</a>', '<a src="page.html">Link</a>'],
        correct: 2
      }
    ]
  },
  
  'css-styling': {
    title: 'CSS Styling Guide',
    duration: '40 min read',
    content: `
# CSS (Cascading Style Sheets)

## Overview

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.

## Table of Contents

1. [CSS Syntax](#css-syntax)
2. [Selectors](#selectors)
3. [Properties and Values](#properties-and-values)
4. [Box Model](#box-model)
5. [Layout](#layout)
6. [Flexbox](#flexbox)
7. [Grid](#grid)
8. [Responsive Design](#responsive-design)
9. [Animations](#animations)
10. [Best Practices](#best-practices)

## CSS Syntax

CSS follows a simple syntax pattern:

\`\`\`css
selector {
    property: value;
    property: value;
}
\`\`\`

### Basic Examples

\`\`\`css
/* Element selector */
h1 {
    color: blue;
    font-size: 24px;
}

/* Class selector */
.highlight {
    background-color: yellow;
    padding: 10px;
}

/* ID selector */
#main-content {
    width: 80%;
    margin: 0 auto;
}
\`\`\`

## Selectors

### Basic Selectors

\`\`\`css
/* Element selector */
p { color: black; }

/* Class selector */
.warning { color: red; }

/* ID selector */
#header { background: blue; }

/* Universal selector */
* { margin: 0; padding: 0; }
\`\`\`

### Attribute Selectors

\`\`\`css
/* Has attribute */
input[required] { border: 2px solid red; }

/* Exact value */
input[type="email"] { background: lightblue; }

/* Contains value */
a[href*="example"] { color: green; }

/* Starts with */
a[href^="https"] { padding-left: 20px; }

/* Ends with */
a[href$=".pdf"] { color: red; }
\`\`\`

### Pseudo-classes

\`\`\`css
/* Link states */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* Form states */
input:focus { outline: 2px solid blue; }
input:disabled { background: gray; }
input:checked { transform: scale(1.1); }

/* Structural pseudo-classes */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: lightgray; }
li:nth-child(3n+1) { color: red; }

/* Other pseudo-classes */
:root { --main-color: blue; }
:empty { display: none; }
:not(.special) { opacity: 0.5; }
\`\`\`

### Pseudo-elements

\`\`\`css
/* First line and letter */
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; float: left; }

/* Before and after */
.quote::before { content: """; }
.quote::after { content: """; }

/* Selection */
::selection { background: yellow; color: black; }

/* Placeholder */
input::placeholder { color: lightgray; }
\`\`\`

### Combinators

\`\`\`css
/* Descendant combinator */
div p { color: blue; }

/* Child combinator */
div > p { font-weight: bold; }

/* Adjacent sibling */
h1 + p { margin-top: 0; }

/* General sibling */
h1 ~ p { color: gray; }
\`\`\`

## Properties and Values

### Colors

\`\`\`css
.color-examples {
    /* Named colors */
    color: red;
    
    /* Hex colors */
    color: #ff0000;
    color: #f00; /* Shorthand */
    
    /* RGB */
    color: rgb(255, 0, 0);
    color: rgba(255, 0, 0, 0.5); /* With alpha */
    
    /* HSL */
    color: hsl(0, 100%, 50%);
    color: hsla(0, 100%, 50%, 0.5); /* With alpha */
    
    /* CSS Variables */
    color: var(--primary-color);
}
\`\`\`

### Typography

\`\`\`css
.typography {
    /* Font family */
    font-family: "Helvetica Neue", Arial, sans-serif;
    
    /* Font size */
    font-size: 16px;
    font-size: 1.2em;
    font-size: 1.5rem;
    
    /* Font weight */
    font-weight: normal; /* 400 */
    font-weight: bold; /* 700 */
    font-weight: 300;
    
    /* Font style */
    font-style: italic;
    font-style: oblique;
    
    /* Text properties */
    text-align: center;
    text-decoration: underline;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1.5;
    
    /* Text shadow */
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
\`\`\`

### Background

\`\`\`css
.background-examples {
    /* Background color */
    background-color: lightblue;
    
    /* Background image */
    background-image: url('image.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    
    /* Shorthand */
    background: url('image.jpg') no-repeat center/cover;
    
    /* Multiple backgrounds */
    background: 
        url('overlay.png') repeat,
        url('background.jpg') no-repeat center/cover;
    
    /* Gradients */
    background: linear-gradient(45deg, red, blue);
    background: radial-gradient(circle, red, blue);
}
\`\`\`

## Box Model

Every element is a rectangular box with content, padding, border, and margin:

\`\`\`css
.box-model {
    /* Content */
    width: 300px;
    height: 200px;
    
    /* Padding (inside border) */
    padding: 20px;
    padding-top: 10px;
    padding-right: 15px;
    padding-bottom: 10px;
    padding-left: 15px;
    
    /* Border */
    border: 2px solid black;
    border-top: 1px dashed red;
    border-radius: 10px;
    
    /* Margin (outside border) */
    margin: 20px;
    margin: 10px 20px; /* vertical horizontal */
    margin: 10px 15px 20px 25px; /* top right bottom left */
    
    /* Box sizing */
    box-sizing: border-box; /* Includes padding and border in width/height */
}
\`\`\`

### Border Examples

\`\`\`css
.border-examples {
    /* Border styles */
    border: 1px solid black;
    border: 2px dashed red;
    border: 3px dotted blue;
    border: 4px double green;
    
    /* Individual borders */
    border-top: 2px solid red;
    border-right: 1px dashed blue;
    
    /* Border radius */
    border-radius: 10px;
    border-radius: 50%; /* Circle */
    border-radius: 10px 20px 30px 40px; /* Individual corners */
    
    /* Box shadow */
    box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
    box-shadow: inset 0 0 10px rgba(0,0,0,0.2); /* Inset shadow */
}
\`\`\`

## Layout

### Display Property

\`\`\`css
.display-examples {
    /* Block elements */
    display: block; /* Full width, new line */
    
    /* Inline elements */
    display: inline; /* Content width, same line */
    
    /* Inline-block */
    display: inline-block; /* Inline but accepts width/height */
    
    /* Hide element */
    display: none;
    
    /* Flex container */
    display: flex;
    
    /* Grid container */
    display: grid;
}
\`\`\`

### Position Property

\`\`\`css
.position-examples {
    /* Static (default) */
    position: static;
    
    /* Relative to original position */
    position: relative;
    top: 10px;
    left: 20px;
    
    /* Absolute positioning */
    position: absolute;
    top: 0;
    right: 0;
    
    /* Fixed positioning */
    position: fixed;
    bottom: 20px;
    right: 20px;
    
    /* Sticky positioning */
    position: sticky;
    top: 0;
}
\`\`\`

### Float and Clear

\`\`\`css
.float-examples {
    /* Float elements */
    float: left;
    float: right;
    float: none;
    
    /* Clear floats */
    clear: left;
    clear: right;
    clear: both;
}

/* Clearfix for containing floated elements */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
\`\`\`

## Flexbox

Flexbox provides an efficient way to arrange items in a container:

\`\`\`css
/* Flex container */
.flex-container {
    display: flex;
    
    /* Direction */
    flex-direction: row; /* default */
    flex-direction: column;
    flex-direction: row-reverse;
    flex-direction: column-reverse;
    
    /* Wrap */
    flex-wrap: nowrap; /* default */
    flex-wrap: wrap;
    flex-wrap: wrap-reverse;
    
    /* Shorthand for direction and wrap */
    flex-flow: row wrap;
    
    /* Justify content (main axis) */
    justify-content: flex-start; /* default */
    justify-content: flex-end;
    justify-content: center;
    justify-content: space-between;
    justify-content: space-around;
    justify-content: space-evenly;
    
    /* Align items (cross axis) */
    align-items: stretch; /* default */
    align-items: flex-start;
    align-items: flex-end;
    align-items: center;
    align-items: baseline;
    
    /* Align content (multiple lines) */
    align-content: stretch;
    align-content: flex-start;
    align-content: center;
    
    /* Gap between items */
    gap: 20px;
    row-gap: 10px;
    column-gap: 20px;
}

/* Flex items */
.flex-item {
    /* Flex grow */
    flex-grow: 1; /* Take remaining space */
    
    /* Flex shrink */
    flex-shrink: 0; /* Don't shrink */
    
    /* Flex basis */
    flex-basis: 200px; /* Initial size */
    
    /* Shorthand */
    flex: 1 0 200px; /* grow shrink basis */
    flex: 1; /* flex: 1 1 0% */
    
    /* Align individual item */
    align-self: flex-end;
    align-self: center;
    
    /* Order */
    order: 2; /* Change visual order */
}
\`\`\`

### Flexbox Examples

\`\`\`css
/* Center content */
.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Navigation bar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

/* Card layout */
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.card {
    flex: 1 1 300px; /* Responsive cards */
    min-width: 250px;
}
\`\`\`

## Grid

CSS Grid provides a two-dimensional layout system:

\`\`\`css
/* Grid container */
.grid-container {
    display: grid;
    
    /* Define columns */
    grid-template-columns: 200px 1fr 100px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    
    /* Define rows */
    grid-template-rows: 100px 1fr 50px;
    grid-template-rows: repeat(3, 100px);
    
    /* Grid gap */
    gap: 20px;
    row-gap: 10px;
    column-gap: 20px;
    
    /* Grid areas */
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
}

/* Grid items */
.grid-item {
    /* Position by line numbers */
    grid-column: 1 / 3; /* From line 1 to line 3 */
    grid-row: 2 / 4;
    
    /* Shorthand */
    grid-area: 2 / 1 / 4 / 3; /* row-start / col-start / row-end / col-end */
    
    /* Span multiple cells */
    grid-column: span 2;
    grid-row: span 3;
    
    /* Named areas */
    grid-area: header;
}
\`\`\`

### Grid Examples

\`\`\`css
/* Basic grid layout */
.layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "sidebar header"
        "sidebar main"
        "sidebar footer";
    min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }

/* Responsive grid */
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

/* Card grid */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}
\`\`\`

## Responsive Design

### Media Queries

\`\`\`css
/* Mobile first approach */
.container {
    width: 100%;
    padding: 1rem;
}

/* Tablet styles */
@media (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        padding: 2rem;
    }
}

/* Print styles */
@media print {
    .no-print {
        display: none;
    }
    
    body {
        font-size: 12pt;
        color: black;
    }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    body {
        background: #333;
        color: white;
    }
}
\`\`\`

### Responsive Units

\`\`\`css
.responsive-units {
    /* Viewport units */
    width: 100vw; /* 100% of viewport width */
    height: 100vh; /* 100% of viewport height */
    font-size: 4vw; /* 4% of viewport width */
    
    /* Relative units */
    font-size: 1.2em; /* Relative to parent font size */
    font-size: 1.5rem; /* Relative to root font size */
    
    /* Percentage */
    width: 50%; /* 50% of parent width */
    
    /* Min/Max functions */
    font-size: clamp(1rem, 4vw, 2rem); /* Min, preferred, max */
    width: min(90%, 1200px); /* Smaller of the two */
    height: max(200px, 20vh); /* Larger of the two */
}
\`\`\`

## Animations

### Transitions

\`\`\`css
.transition-example {
    background-color: blue;
    transform: scale(1);
    transition: all 0.3s ease;
    
    /* Specific properties */
    transition-property: background-color, transform;
    transition-duration: 0.3s, 0.5s;
    transition-timing-function: ease, ease-in-out;
    transition-delay: 0s, 0.1s;
}

.transition-example:hover {
    background-color: red;
    transform: scale(1.1);
}
\`\`\`

### Keyframe Animations

\`\`\`css
/* Define keyframes */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes bounce {
    0%, 20%, 60%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    80% {
        transform: translateY(-15px);
    }
}

/* Apply animations */
.animated-element {
    animation: slideIn 0.5s ease-out;
    
    /* Multiple animations */
    animation: slideIn 0.5s ease-out, bounce 2s infinite;
    
    /* Individual properties */
    animation-name: slideIn;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-delay: 0.2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: forwards;
    animation-play-state: paused;
}
\`\`\`

### Transform

\`\`\`css
.transform-examples {
    /* 2D transforms */
    transform: translate(50px, 100px);
    transform: translateX(50px);
    transform: translateY(100px);
    transform: scale(1.5);
    transform: scaleX(2);
    transform: rotate(45deg);
    transform: skew(30deg, 20deg);
    
    /* 3D transforms */
    transform: translateZ(50px);
    transform: rotateX(45deg);
    transform: rotateY(45deg);
    transform: rotateZ(45deg);
    
    /* Multiple transforms */
    transform: translate(50px, 100px) rotate(45deg) scale(1.2);
    
    /* Transform origin */
    transform-origin: top left;
    transform-origin: 50% 50%; /* center */
    
    /* 3D properties */
    transform-style: preserve-3d;
    perspective: 1000px;
    backface-visibility: hidden;
}
\`\`\`

## CSS Variables (Custom Properties)

\`\`\`css
/* Define variables */
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-size: 16px;
    --spacing: 1rem;
}

/* Use variables */
.component {
    color: var(--primary-color);
    font-size: var(--font-size);
    padding: var(--spacing);
    
    /* Fallback value */
    background: var(--tertiary-color, #gray);
}

/* Variables can be overridden */
.dark-theme {
    --primary-color: #e74c3c;
    --secondary-color: #f39c12;
}

/* Dynamic variables with JavaScript */
.dynamic {
    background: var(--dynamic-color);
}
\`\`\`

## Best Practices

### 1. Use a CSS Reset or Normalize

\`\`\`css
/* Simple reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Or use normalize.css */
\`\`\`

### 2. Organize Your CSS

\`\`\`css
/* 1. Variables */
:root {
    --primary-color: blue;
}

/* 2. Reset/Normalize */
* { box-sizing: border-box; }

/* 3. Base styles */
body { font-family: Arial, sans-serif; }

/* 4. Layout */
.container { max-width: 1200px; }

/* 5. Components */
.button { padding: 10px 20px; }

/* 6. Utilities */
.text-center { text-align: center; }

/* 7. Media queries */
@media (max-width: 768px) {
    .container { padding: 1rem; }
}
\`\`\`

### 3. Use Meaningful Class Names

\`\`\`css
/* Good - semantic names */
.navigation-menu { }
.article-title { }
.call-to-action-button { }

/* Avoid - presentational names */
.red-text { }
.big-font { }
.float-left { }
\`\`\`

### 4. Keep Specificity Low

\`\`\`css
/* Good - low specificity */
.article-title { color: blue; }

/* Avoid - high specificity */
div#content .article .title h1 { color: blue; }

/* Use classes instead of IDs for styling */
.header { } /* Better than #header */
\`\`\`

### 5. Use Shorthand Properties

\`\`\`css
/* Good - shorthand */
margin: 10px 20px 10px 20px;
padding: 1rem;
background: url('bg.jpg') no-repeat center/cover;
font: bold 16px/1.5 Arial, sans-serif;

/* Instead of individual properties */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 10px;
margin-left: 20px;
\`\`\`

### 6. Progressive Enhancement

\`\`\`css
/* Base styles for all browsers */
.button {
    padding: 10px 20px;
    background: blue;
    color: white;
    border: none;
}

/* Enhanced styles for modern browsers */
@supports (display: grid) {
    .layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
\`\`\`

## Summary

CSS is a powerful language for styling web pages. Key concepts include:

- **Selectors**: Target specific elements
- **Box Model**: Content, padding, border, margin
- **Layout**: Flexbox and Grid for modern layouts
- **Responsive Design**: Media queries and flexible units
- **Animations**: Transitions and keyframes
- **Variables**: Reusable values
- **Best Practices**: Organized, maintainable code

## External Resources

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
- [Flexbox Froggy](https://flexboxfroggy.com/) - Learn Flexbox
- [Grid Garden](https://cssgridgarden.com/) - Learn CSS Grid
- [Can I Use](https://caniuse.com/) - Browser support
    `,
    quiz: [
      {
        question: 'What does CSS stand for?',
        options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
        correct: 1
      },
      {
        question: 'Which property is used to change the background color?',
        options: ['color', 'background-color', 'bgcolor', 'background'],
        correct: 1
      },
      {
        question: 'How do you select an element with id "header"?',
        options: ['.header', '#header', '*header', 'header'],
        correct: 1
      }
    ]
  }
};

export default readingModules;
 