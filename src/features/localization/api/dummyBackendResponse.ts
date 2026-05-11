import type { RawLocalizationItem } from "../types/localization.types";

export function dummyBackendResponse(
  namespace: string,
  language: string,
): RawLocalizationItem[] {
  const localizationData = {
    p002: {
      en: [
        // page
        { key: "title", label: "Countries" },
        { key: "subtitle", label: "Manage and view available countries" },
        { key: "add", label: "Add Country" },

        // states
        { key: "loading", label: "Loading countries..." },
        { key: "error", label: "Failed to load countries" },
        { key: "retry", label: "Retry" },
        { key: "empty", label: "No countries found" },

        // table
        { key: "name", label: "Name" },
        { key: "phone_code", label: "Phone Code" },
        { key: "notes", label: "Notes" },

        // form
        { key: "name_placeholder", label: "Country Name" },
        { key: "phone_placeholder", label: "+20" },
        { key: "notes_placeholder", label: "Optional notes" },
        { key: "save", label: "Save" },
        { key: "saving", label: "Saving..." },

        // sheets
        { key: "create_title", label: "Create Country" },
        { key: "edit_title", label: "Edit Country" },

        // delete
        { key: "delete_title", label: "Delete Country" },
        {
          key: "delete_confirm",
          label:
            "Are you sure you want to delete? This action cannot be undone.",
        },
        { key: "delete", label: "Delete" },
        { key: "deleting", label: "Deleting..." },
        { key: "cancel", label: "Cancel" },

        // toast
        { key: "created", label: "Country created" },
        { key: "create_failed", label: "Failed to create country" },
        { key: "updated", label: "Country updated" },
        { key: "update_failed", label: "Failed to update country" },
        { key: "deleted", label: "Country deleted" },
        { key: "delete_failed", label: "Failed to delete country" },
      ],

      ar: [
        // page
        { key: "title", label: "الدول" },
        { key: "subtitle", label: "إدارة وعرض الدول المتاحة" },
        { key: "add", label: "إضافة دولة" },

        // states
        { key: "loading", label: "جاري تحميل الدول..." },
        { key: "error", label: "فشل في تحميل الدول" },
        { key: "retry", label: "إعادة المحاولة" },
        { key: "empty", label: "لا توجد دول" },

        // table
        { key: "name", label: "الاسم" },
        { key: "phone_code", label: "كود الهاتف" },
        { key: "notes", label: "ملاحظات" },

        // form
        { key: "name_placeholder", label: "اسم الدولة" },
        { key: "phone_placeholder", label: "+20" },
        { key: "notes_placeholder", label: "ملاحظات اختيارية" },
        { key: "save", label: "حفظ" },
        { key: "saving", label: "جاري الحفظ..." },

        // sheets
        { key: "create_title", label: "إضافة دولة" },
        { key: "edit_title", label: "تعديل الدولة" },

        // delete
        { key: "delete_title", label: "حذف الدولة" },
        {
          key: "delete_confirm",
          label: "هل أنت متأكد من حذف ؟ لا يمكن التراجع عن هذا الإجراء.",
        },
        { key: "delete", label: "حذف" },
        { key: "deleting", label: "جاري الحذف..." },
        { key: "cancel", label: "إلغاء" },

        // toast
        { key: "created", label: "تم إنشاء الدولة بنجاح" },
        { key: "create_failed", label: "فشل في إنشاء الدولة" },
        { key: "updated", label: "تم تحديث الدولة بنجاح" },
        { key: "update_failed", label: "فشل في تحديث الدولة" },
        { key: "deleted", label: "تم حذف الدولة بنجاح" },
        { key: "delete_failed", label: "فشل في حذف الدولة" },
      ],
    },
    p008: {
      en: [
        {
          key: "title",
          label: "Employees",
        },
        {
          key: "subtitle",
          label: "Manage and view employees",
        },
        {
          key: "add",
          label: "Add Employee",
        },
        {
          key: "loading",
          label: "Loading employees...",
        },
        {
          key: "error",
          label: "Failed to load employees",
        },
        {
          key: "retry",
          label: "Retry",
        },
        {
          key: "empty",
          label: "No employees found",
        },
        {
          key: "name",
          label: "Name",
        },
        {
          key: "phone",
          label: "Phone",
        },
        {
          key: "mobile",
          label: "Mobile",
        },
        {
          key: "email",
          label: "Email",
        },
        {
          key: "branch",
          label: "Branch",
        },
        {
          key: "job_name",
          label: "Job",
        },
        {
          key: "gender",
          label: "Gender",
        },
        {
          key: "military_status",
          label: "Military Status",
        },
        {
          key: "marital_status",
          label: "Marital Status",
        },
        {
          key: "birth_date",
          label: "Birth Date",
        },
        {
          key: "national_id",
          label: "National ID",
        },
        {
          key: "social_id",
          label: "Social ID",
        },
        {
          key: "address",
          label: "Address",
        },
        {
          key: "notes",
          label: "Notes",
        },
        {
          key: "country",
          label: "Country",
        },
        {
          key: "state",
          label: "State",
        },
        {
          key: "city",
          label: "City",
        },
        {
          key: "active",
          label: "Active",
        },
        {
          key: "actions",
          label: "Actions",
        },
        {
          key: "save",
          label: "Save",
        },
        {
          key: "select_country",
          label: "Select Country",
        },
        {
          key: "select_state",
          label: "Select State",
        },
        {
          key: "select_city",
          label: "Select City",
        },
        {
          key: "select_gender",
          label: "Select Gender",
        },
        {
          key: "select_branch",
          label: "Select Branch",
        },
        {
          key: "select_job",
          label: "Select Job",
        },
        {
          key: "select_military_status",
          label: "Select Military Status",
        },
        {
          key: "select_marital_status",
          label: "Select Marital Status",
        },
        {
          key: "edit",
          label: "Edit Employee",
        },
        {
          key: "show",
          label: "Employee Details",
        },
        {
          key: "basic_information",
          label: "Basic Information",
        },
        {
          key: "personal_information",
          label: "Personal Information",
        },
        {
          key: "contact_information",
          label: "Contact Information",
        },
        {
          key: "location_information",
          label: "Location",
        },
        {
          key: "additional_notes",
          label: "Additional Notes",
        },
        {
          key: "basic_information_description",
          label: "Main employee identity and assignment data",
        },
        {
          key: "personal_information_description",
          label: "Identification and personal records",
        },
        {
          key: "contact_information_description",
          label: "Communication and address details",
        },
        {
          key: "location_information_description",
          label: "Country, state, and city information",
        },
        {
          key: "employee_availability_status",
          label: "Employee availability status",
        },
      ],

      ar: [
        {
          key: "title",
          label: "الموظفين",
        },
        {
          key: "subtitle",
          label: "إدارة وعرض الموظفين",
        },
        {
          key: "add",
          label: "إضافة موظف",
        },
        {
          key: "loading",
          label: "جاري تحميل الموظفين",
        },
        {
          key: "error",
          label: "فشل تحميل الموظفين",
        },
        {
          key: "retry",
          label: "إعادة المحاولة",
        },
        {
          key: "empty",
          label: "لا يوجد موظفين",
        },
        {
          key: "name",
          label: "الاسم",
        },
        {
          key: "phone",
          label: "الهاتف",
        },
        {
          key: "mobile",
          label: "الموبايل",
        },
        {
          key: "email",
          label: "البريد الإلكتروني",
        },
        {
          key: "branch",
          label: "الفرع",
        },
        {
          key: "job_name",
          label: "الوظيفة",
        },
        {
          key: "gender",
          label: "النوع",
        },
        {
          key: "military_status",
          label: "الموقف العسكري",
        },
        {
          key: "marital_status",
          label: "الحالة الاجتماعية",
        },
        {
          key: "birth_date",
          label: "تاريخ الميلاد",
        },
        {
          key: "national_id",
          label: "الرقم القومي",
        },
        {
          key: "social_id",
          label: "الرقم التأميني",
        },
        {
          key: "address",
          label: "العنوان",
        },
        {
          key: "notes",
          label: "ملاحظات",
        },
        {
          key: "country",
          label: "الدولة",
        },
        {
          key: "state",
          label: "المحافظة",
        },
        {
          key: "city",
          label: "المدينة",
        },
        {
          key: "active",
          label: "نشط",
        },
        {
          key: "actions",
          label: "الإجراءات",
        },
        {
          key: "save",
          label: "حفظ",
        },
        {
          key: "select_country",
          label: "اختر الدولة",
        },
        {
          key: "select_state",
          label: "اختر المحافظة",
        },
        {
          key: "select_city",
          label: "اختر المدينة",
        },
        {
          key: "select_gender",
          label: "اختر النوع",
        },
        {
          key: "select_branch",
          label: "اختر الفرع",
        },
        {
          key: "select_job",
          label: "اختر الوظيفة",
        },
        {
          key: "select_military_status",
          label: "اختر الموقف العسكري",
        },
        {
          key: "select_marital_status",
          label: "اختر الحالة الاجتماعية",
        },
        {
          key: "edit",
          label: "تعديل موظف",
        },
        {
          key: "show",
          label: "تفاصيل الموظف",
        },
        {
          key: "basic_information",
          label: "البيانات الأساسية",
        },
        {
          key: "personal_information",
          label: "البيانات الشخصية",
        },
        {
          key: "contact_information",
          label: "بيانات التواصل",
        },
        {
          key: "location_information",
          label: "الموقع",
        },
        {
          key: "additional_notes",
          label: "ملاحظات إضافية",
        },
        {
          key: "basic_information_description",
          label: "بيانات تعريف الموظف والبيانات الوظيفية الأساسية",
        },
        {
          key: "personal_information_description",
          label: "بيانات الهوية والسجلات الشخصية",
        },
        {
          key: "contact_information_description",
          label: "بيانات التواصل والعنوان",
        },
        {
          key: "location_information_description",
          label: "بيانات الدولة والمحافظة والمدينة",
        },
        {
          key: "employee_availability_status",
          label: "حالة توفر الموظف",
        },
      ],
    },
  };
  const namespaceData =
    localizationData[namespace as keyof typeof localizationData];
  if (!namespaceData) {
    console.warn(`[i18n] Missing namespace in dummy: ${namespace}`);
    return [];
  }
  const langData = namespaceData[language as keyof typeof namespaceData];
  if (!langData) {
    console.warn(
      `[i18n] Missing language "${language}" in namespace "${namespace}"`,
    );
    return [];
  }
  return langData;
}
