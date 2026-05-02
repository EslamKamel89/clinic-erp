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
  permissions: Permissions;
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
  Permission: {
    "User Accounts": Action[];
    Languages: Action[];
    Counties: Action[];
    States: Action[];
    Cities: Action[];
  };
};

export type RawMenuItem = {
  menu_name: string;
  icon?: string;
  pagelink?: string;
  children?: RawMenuItem[];
};

export type Action = "create" | "update" | "delete" | "show";

export type Permissions = {
  userAccounts: Action[];
  languages: Action[];
  countries: Action[];
  states: Action[];
  cities: Action[];
};
