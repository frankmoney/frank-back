const code = "HCB"
const name = "HackClub Bank"

export default {
	
	institution: {
      code,
      name,
      small_logo_url: "string",
      medium_logo_url: "string",
      url: "https://hackclub.com/bank/",
      supports_account_identification: false,
      supports_account_verification: false,
      isHcb: true
    },

    isMatchSearch: (search: string) => name.toLowerCase().includes(search.toLowerCase()),

    isHcbCode: (_code: string) => code === _code,

    credentials: [
    	{
            "guid": "hcb-token",
            "type": "LOGIN",
            "label": "HCB token",
            "fieldName": "LOGIN",
            "displayOrder": 1
          }
    ],


}