
import * as Yup from 'yup'

export const addCardSchema = Yup.object().shape({
    bankName: Yup.mixed()
        .required(" لطفا نام بانک را انتخاب کنید "),
    number1: Yup.number()
        .typeError('4 رقم اول باید عدد باشد')
        .positive('4 رقم اول نامعتبر است')
        .required('لطفا 4 رقم اول را پر کنید')
        .test('len', ' 4 رقم اول  کمتر از 4 رقم است', (val) => val && val.toString().length >= 4),
    number2: Yup.number()
        .typeError('4 رقم دوم باید عدد باشد')
        .positive('4 رقم دوم نامعتبر است')
        .required('لطفا 4 رقم دوم را پر کنید')
        .test('len', ' 4 رقم دوم  کمتر از 4 رقم است', (val) => val && val.toString().length >= 4),
    number3: Yup.number()
        .typeError('4 رقم سوم باید عدد باشد')
        .positive('4 رقم سوم نامعتبر است')
        .required('لطفا 4 رقم سوم را پر کنید')
        .test('len', ' 4 رقم سوم  کمتر از 4 رقم است', (val) => val && val.toString().length >= 4),
    number4: Yup.number()
        .typeError('4 رقم آخر باید عدد باشد')
        .positive('4 رقم آخر نامعتبر است')
        .required('لطفا 4 رقم آخر را پر کنید')
        .test('len', ' 4 رقم آخر  کمتر از 4 رقم است', (val) => val && val.toString().length >= 4),
    cvv2: Yup.number()
        .typeError('cvv2 باید عدد باشد')
        .positive('cvv2  نامعتبر است')
        .required('  لطفا فیلد cvv2  را پر کنید '),
    exp_year: Yup.number()
        .typeError('سال وارد شده باید عدد باشد')
        .positive('سال وارد شده  نامعتبر است')
        .required('  لطفا فیلد سال  را پر کنید ')
        .moreThan(1400, "سال وارد شده نباید کمتر از 1401 باشد")
    ,
    exp_month: Yup.number()
        .typeError('ماه وارد شده باید عدد باشد')
        .positive('ماه وارد شده  نامعتبر است')
        .required('  لطفا فیلد ماه  را پر کنید ')
        .lessThan(13, "ماه وارد شده نباید بزرگتر از 12 باشد"),

})