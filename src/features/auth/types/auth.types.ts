/* api response example
{
    "Result": true,
    "Message": "",
    "Data": {
        "User_Name": "s",
        "Emp_Name": "sys",
        "Branch_Name": "فرع _1",
        "Company_Name": "شركة_1",
        "Authorization": "y3eeQNDtudY2AVNiAvLzyw",
        "lang": "ar",
        "Lang_Dir": "rtl",
        "MenuStyle": "Horizontal",
        "Time_Zone": 2,
        "User_ID": 0,
        "Emp_ID": 0,
        "Branch_ID": 1,
        "Company_ID": 1,
        "Option_ID": 1,
        "MenuStyle_ID": 2
    },
    "menu": [
        {
            "menu_name": "ملف",
            "pages_count": "1",
            "icon": "Icon",
            "children": [
                {
                    "menu_name": "حسابات المستخدمين",
                    "pages_count": "0",
                    "pagelink": "UserAccounts/UserAccounts",
                    "icon": "Icon"
                }
            ]
        },
        {
            "menu_name": "ملف2",
            "pages_count": "1",
            "icon": "Icon",
            "children": [
                {
                    "menu_name": "Menu4",
                    "pages_count": "2",
                    "icon": "Icon",
                    "children": [
                        {
                            "menu_name": "Page",
                            "pages_count": "0",
                            "pagelink": "UserAccounts/UserAccounts",
                            "icon": "Icon"
                        },
                        {
                            "menu_name": "Test",
                            "pages_count": "0",
                            "pagelink": "UserAccounts/UserAccounts",
                            "icon": "Icon"
                        }
                    ]
                }
            ]
        }
    ]
}
/*
mapping from api to model
| Backend      | Frontend    |
| ------------ | ----------- |
| User_ID      | id          |
| User_Name    | username    |
| Emp_Name     | name        |
| Branch_Name  | branchName  |
| Company_Name | companyName |

*/

export type Language = "en" | "ar";
export type User = {
  id: number;
  username: string;
  name: string;
  branchName: string;
  companyName: string;
};

export type MenuItem = {
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
};

export type AuthModel = {
  user: User;
  token: string;
  menu: MenuItem[];
  language: Language;
  direction: "rtl" | "ltr";
};

export type LoginResponseRaw = {
  Result: boolean;
  Message: string;
  Data: {
    User_Name: string;
    Emp_Name: string;
    Branch_Name: string;
    Company_Name: string;
    Authorization: string;
    lang: string;
    Lang_Dir: "rtl" | "ltr";
    MenuStyle: string;
    Time_Zone: number;
    User_ID: number;
    Emp_ID: number;
    Branch_ID: number;
    Company_ID: number;
    Option_ID: number;
    MenuStyle_ID: number;
  };
  menu: RawMenuItem[];
};

export type RawMenuItem = {
  menu_name: string;
  icon?: string;
  pagelink?: string;
  children?: RawMenuItem[];
};
