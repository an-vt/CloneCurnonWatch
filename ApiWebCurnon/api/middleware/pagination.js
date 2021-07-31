// export function paginations(model) {
//     return async (req ,res ,next) => {
//         const page =  parseInt(req.query.page);
//         const limit =  parseInt(req.query.limit);

//         const startIndex = (page - 1)  * limit;
//         const endIndex = page * limit;

//         const result = {}

//         if(endIndex < model.length){
//             result.next = {
//                 page : page + 1,
//                 limit : limit
//             }
//         }

//         if(startIndex > 0) {
//             result.previous = {
//                 page : page - 1,
//                 limit : limit
//             }
//         }

//         try {
//             let search = req.body.search;
//             result.results = await model.find({ "name": {'$regex': search} }).limit(limit).skip(startIndex).exec()
//             res.paginateResults = results
//             next()
//         } catch (error) {
//             res.status(500).json({ message : error.message })
//         }
//     }
// }