```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes to the input field and presses the "Save"-button
        
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server
```