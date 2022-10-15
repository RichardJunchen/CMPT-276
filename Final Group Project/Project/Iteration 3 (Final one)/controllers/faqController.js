const faqPage = {
    viewFAQ: (req, res) => {
        res.render('faq');
    },
    viewGuideline:(req,res)=>{
        res.render('guideline');
    }
}

module.exports = faqPage;