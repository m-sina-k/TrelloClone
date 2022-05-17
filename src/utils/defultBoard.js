import { v4 as uuidV4 } from "uuid";

export const defaultBoard = {
  id: uuidV4(),
  name: "تخته پیش فرض",
  isMarked: false,
  avatarBg: "#ffa801",
  lists: [
    {
      id: uuidV4(),
      name: "وظایف کاری",
      items: [
        {
          id: uuidV4(),
          title: "اتمام پروژه",
          labels: ["#eb5a46"],
          checklists: [
            {
              id: uuidV4(),
              name: "بخش های پروژه",
              items: [
                { id: uuidV4(), title: "طراحی UI", isCompeleted: true },
                {
                  id: uuidV4(),
                  title: "پیاده سازی کد های Js",
                  isCompeleted: true,
                },
                { id: uuidV4(), title: "push در گیت هاب", isCompeleted: false },
              ],
            },
          ],
          attachList: [
            {
              id: uuidV4(),
              name: "لینک ریپازیتوری گیت هاب",
              type: "link",
              url: "https://github.com/m-sina-k/Trello-Clone.git",
            },
          ],
        },
        {
          id: uuidV4(),
          title: "تماس با مدیر پروژه",
          labels: ["#eb5a46"],
          checklists: [
            {
              id: uuidV4(),
              name: "موضوعات:",
              items: [
                {
                  id: uuidV4(),
                  title: "دریافت لیست آخرین تغییرات پروژه",
                  isCompeleted: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: uuidV4(),
      name: "کارهای شخصی",
      items: [
        {
          id: uuidV4(),
          title: "ورزش صبحگاهی",
          labels: ["#61bd4f"],
        },
        {
          id: uuidV4(),
          title: "مراجعه به مطب دکتر",
          labels: ["#eb5a46"],
          desc: "تکمیل آزمایشات و دریافت نتایج قبل از ملاقات با دکتر",
          date: { days: "۱۴۰۱/۰۸/۱۸", type: "single", time: "17:30" },
        },
        {
          id: uuidV4(),
          title: "شرکت در مهمانی تولد",
          desc: "نشانی : میدان لورم، خیابان ایپسوم، بن بست اول، پلاک 17",
          date: { days: "۱۴۰۱/۰۶/۲۲", type: "single", time: "19:45" },
          checklists: [
            {
              name: "موارد:",
              id: uuidV4(),
              items: [{ id: uuidV4(), title: "خرید هدیه", isCompeleted: true }],
            },
          ],
        },
        {
          id: uuidV4(),
          title: "خرید از فروشگاه",
          labels: ["#c377e0"],
        },
        {
          id: uuidV4(),
          title: "قرار ملاقات با دوستان",
          date: { days: "۱۴۰۱/۰۲/۳۱", type: "single", time: "16:30" },
        },
        {
          id: uuidV4(),
          title: "رسیدگی به باغچه",
          checklists: [
            {
              name: "موارد:",
              id: uuidV4(),
              items: [
                { id: uuidV4(), title: "آبیاری گل ها", isCompeleted: false },
                {
                  id: uuidV4(),
                  title: "کاشت گل های جدید",
                  isCompeleted: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: uuidV4(),
      name: "وظایف تحصیلی",
      items: [
        {
          id: uuidV4(),
          title: "تکمیل مقاله",
          labels: ["#ff9f1a"],
          date: {
            days: ["۱۴۰۱/۰۵/۲۶", "۱۴۰۱/۰۵/۳۱"],
            type: "range",
            time: "00:00",
          },
        },
        {
          id: uuidV4(),
          title: "کلاس زبان",
        },
        {
          id: uuidV4(),
          title: "شرکت در سمینار آموزشی",
          date: {
            days: "۱۴۰۱/۰۴/۲۰",
            type: "single",
            time: "18:00",
          },
        },
      ],
    },
  ],
};
