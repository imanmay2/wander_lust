const Joi=require("joi");

const schema=Joi.object({
    // title_,descrip_,url_,price_,location_,country_

    title_: Joi.string().required(),
    descrip_:Joi.string().required(),
    url_:Joi.string().allow("",null),
    price_:Joi.number().min(0).required(),
    location_:Joi.string().required(),
    country_:Joi.string().required()
});

module.exports=schema;

// const reviewSchema=Joi.object({
//     review:Joi.object({
//         rating:Joi.number().required().min(1).max(5),
//         comment:Joi.string.required(),
//     }).required(),
// });

// module.exports=reviewSchema;