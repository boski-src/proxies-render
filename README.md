##### Commands
  - help    
   	- Display help for proxies-renderer
  - render  
   	- Render proxy list

##### Render command options:
  -c, --country=country  [default: US] Country code
  
  -o, --output=output    [default: proxies.json] Output file path
  
  -s, --source=source    [default: spys.one] Source of proxies (eg. proxynova.com, spys.one)
  
  --ssl=true              Force ssl proxies
  
  --testUrl=URL_TO_TEST      [default: https://www.google.com/?q=test] Test url for proxy
  

##### Example output (proxies.json)
```
[
  {
    "ip": "82.119.170.106",
    "port": "8080",
    "source": "proxynova.com",
    "score": 295.4157228571429,
    "responseTime": 1037
  },
  {
    "ip": "80.187.140.26",
    "port": "8080",
    "source": "proxynova.com",
    "score": 352.7370592857143,
    "responseTime": 1874
  }
]
```
