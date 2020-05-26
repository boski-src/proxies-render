#####Commands
  - help    
   	- Display help for proxies-renderer
  - render  
   	- Render proxy list

#####Render command options:
  - -c, --country=country  
  	- Country code (default: US)
  - -o, --output=output    
  	- Output file path (default: proxies.json)
  - -s, --source=source    
    - Source of proxies (eg. proxynova.com, spys.one)

#####Example output (proxies.json)
```
[
	{
		"ip": "80.211.246.8",
		"port": "8080",
		"source": "spys.com",
		"score": 65.76242857142857
	},
	{
		"ip": "83.4.126.109",
		"port": "8080",
		"source": "spys.com",
		"score": 60.37528571428572
	},
	{
		"ip": "88.199.21.77",
		"port": "80",
		"source": "spys.com",
		"score": 58.92242857142857
	},
	{
		"ip": "185.238.239.20",
		"port": "8090",
		"source": "spys.com",
		"score": 9.738428571428571
	},
	{
		"ip": "46.171.63.106",
		"port": "8080",
		"source": "spys.com",
		"score": 8.596857142857143
	}
]
```