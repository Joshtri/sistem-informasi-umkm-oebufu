export const statisticPage = async(req,res)=>{
    const title = "Main Statistik";
    res.render('main_stats',{

        title
    });
};