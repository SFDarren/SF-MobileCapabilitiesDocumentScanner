import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getDocumentScanner } from 'lightning/mobileCapabilities';
import { reduceErrors } from 'c/utils'
import { ShowToastEvent} from 'lightning/platformShowToastEvent'
import createLink from '@salesforce/apex/DocumentController.createLink'

export default class NfcReader extends LightningElement {
    text;
    titles = ["marketing specialist","marketing manager","marketing director","graphic designer","marketing research analyst","marketing communications manager","marketing consultant","product manager","public relations","social media assistant","brand manager","seo manager","content marketing manager","copywriter","media buyer","digital marketing manager","ecommerce marketing specialist","brand strategist","vice president of marketing","media relations coordinator","administrative assistant","receptionist","office manager","auditing clerk","bookkeeper","account executive","branch manager","business manager","quality control coordinator","administrative manager","chief executive officer","business analyst","risk manager","human resources","office assistant","secretary","office clerk","file clerk","account collector","administrative specialist","executive assistant","program administrator","program manager","administrative analyst","data entry","ceo—chief executive officer","coo—chief operating officer","cfo—chief financial officer","cio—chief information officer","cto—chief technology officer","cmo—chief marketing officer","chro—chief human resources officer","cdo—chief data officer","cpo—chief product officer","cco—chief customer officer","team leader","manager","assistant manager","executive","director","coordinator","administrator","controller","officer","organizer","supervisor","superintendent","head","overseer","chief","foreman","controller","principal","president","lead","computer scientist","it professional","ux designer & ui developer","sql developer","web designer","web developer","help desk worker/desktop support","software engineer","data entry","devops engineer","computer programmer","network administrator","information security analyst","artificial intelligence engineer","cloud architect","it manager","technical specialist","application developer","chief technology officer (cto)","chief information officer (cio)","sales associate","sales representative","sales manager","retail worker","store manager","sales representative","sales manager","real estate broker","sales associate","cashier","store manager","account executive","account manager","area sales manager","direct salesperson","director of inside sales","outside sales manager","sales analyst","market development manager","b2b sales specialist","sales engineer","merchandising associate","sales associate","sales representative","sales manager","retail worker","store manager","sales representative","sales manager","real estate broker","sales associate","cashier","store manager","account executive","account manager","area sales manager","direct salesperson","director of inside sales","outside sales manager","sales analyst","market development manager","b2b sales specialist","sales engineer","merchandising associate","associate","engineer","ceo","proprietor","principal","owner","president","founder","administrator","director","managing partner","managing member","board of directors","c-level or c-suite.","shareholders","managers","supervisors","front-line employees","quality control","human resources","accounting staff","marketing staff","purchasing staff","shipping and receiving staff","office manager","receptionist","virtual assistant","customer service","customer support","concierge","help desk","customer service manager","technical support specialist","account representative","client service specialist","customer care associate","operations manager","operations assistant","operations coordinator","operations analyst","operations director","vice president of operations","operations professional","scrum master","continuous improvement lead","continuous improvement consultant","operations manager","operations assistant","operations coordinator","operations analyst","operations director","vice president of operations","operations professional","scrum master","continuous improvement lead","continuous improvement consultant","credit authorizer","benefits manager","credit counselor","accountant","bookkeeper","accounting analyst","accounting director","accounts payable/receivable clerk","auditor","budget analyst","controller","financial analyst","finance manager","economist","payroll manager","payroll clerk","financial planner","financial services representative","finance director","commercial loan officer","engineer","mechanical engineer","civil engineer","electrical engineer","assistant engineer","chemical engineer","chief engineer","drafter","engineering technician","geological engineer","biological engineer","maintenance engineer","mining engineer","nuclear engineer","petroleum engineer","plant engineer","production engineer","quality engineer","safety engineer","sales engineer","chief people officer","vp of miscellaneous stuff","chief robot whisperer","director of first impressions","culture operations manager","director of ethical hacking","software ninjaneer","director of bean counting","digital overlord","director of storytelling","researcher","research assistant","data analyst","business analyst","financial analyst","biostatistician","title researcher","market researcher","title analyst","medical researcher","mentor","tutor/online tutor","teacher","teaching assistant","substitute teacher","preschool teacher","test scorer","online esl instructor","professor","assistant professor","graphic designer","artist","interior designer","video editor","video or film producer","playwright","musician","novelist/writer","computer animator","photographer","camera operator","sound engineer","motion picture director","actor","music producer","director of photography","","nurse","travel nurse","nurse practitioner","doctor","caregiver","cna","physical therapist","pharmacist","pharmacy assistant","medical administrator","medical laboratory tech","physical therapy assistant","massage therapy","dental hygienist","orderly","personal trainer","massage therapy","medical laboratory tech","phlebotomist","medical transcriptionist","telework nurse/doctor","reiki practitioner","housekeeper","flight attendant","travel agent","hotel front door greeter","bellhop","cruise director","entertainment specialist","hotel manager","front desk associate","front desk manager","concierge","group sales","event planner","porter","spa manager","wedding coordinator","cruise ship attendant","casino host","hotel receptionist","reservationist","events manager","meeting planner","lodging manager","director of maintenance","valet","waiter/waitress","server","chef","fast food worker","barista","line cook","cafeteria worker","restaurant manager","wait staff manager","bus person","restaurant chain executive","political scientist","chemist","conservation scientist","sociologist","biologist","geologist","physicist","astronomer","atmospheric scientist","molecular scientist","call center representative","customer service","telemarketer","telephone operator","phone survey conductor","dispatcher for trucks or taxis","customer support representative","over the phone interpreter","phone sales specialist","mortgage loan processor","counselor","mental health counselor","addiction counselor","school counselor","speech pathologist","guidance counselor","social worker","therapist","life coach","couples counselor","beautician","hair stylist","nail technician","cosmetologist","salon manager","makeup artist","esthetician","skin care specialist","manicurist","barber","journalist","copy editor","editor/proofreader","content creator","speechwriter","communications director","screenwriter","technical writer","columnist","public relations specialist","proposal writer","content strategist","grant writer","video game writer","translator","film critic","copywriter","travel writer","social media specialist","ghostwriter","warehouse worker","painter","truck driver","heavy equipment operator","welding","physical therapy assistant","housekeeper","landscaping worker","landscaping assistant","mover","animal breeder","veterinary assistant","farm worker","animal shelter worker","dog walker / pet sitter","zoologist","animal trainer","service dog trainer","animal shelter manager","animal control officer","delivery driver","school bus driver","truck driver","tow truck operator","ups driver","mail carrier","recyclables collector","courier","bus driver","cab driver","","animal shelter board member","office volunteer","animal shelter volunteer","hospital volunteer","youth volunteer","food kitchen worker","homeless shelter worker","conservation volunteer","meals on wheels driver","habitat for humanity builder","emergency relief worker","red cross volunteer","community food project worker","women’s shelter jobs","suicide hotline volunteer","school volunteer","community volunteer jobs","sports volunteer","church volunteer","archivist","actuary","architect","personal assistant","entrepreneur","security guard","mechanic","recruiter","mathematician","locksmith","management consultant","shelf stocker","caretaker or house sitter","library assistant","translator","hvac technician","attorney","paralegal","executive assistant","personal assistant","bank teller","parking attendant","machinery operator","manufacturing assembler","funeral attendant","assistant golf professional","yoga instructor"]
    names = ["liam","noah","oliver","james","elijah","mateo","theodore","henry","lucas","william","benjamin","levi","sebastian","jack","ezra","michael","daniel","leo","owen","samuel","hudson","alexander","asher","luca","ethan","john","david","jackson","joseph","mason","luke","matthew","julian","dylan","elias","jacob","maverick","gabriel","logan","aiden","thomas","isaac","miles","grayson","santiago","anthony","wyatt","carter","jayden","ezekiel","caleb","cooper","josiah","charles","christopher","isaiah","nolan","cameron","nathan","joshua","kai","waylon","angel","lincoln","andrew","roman","adrian","aaron","wesley","ian","thiago","axel","brooks","bennett","weston","rowan","christian","theo","beau","eli","silas","jonathan","ryan","leonardo","walker","jaxon","micah","everett","robert","enzo","parker","jeremiah","jose","colton","luka","easton","landon","jordan","amir","gael","austin","adam","jameson","august","xavier","myles","dominic","damian","nicholas","jace","carson","atlas","adriel","kayden","hunter","river","greyson","emmett","harrison","vincent","milo","jasper","giovanni","jonah","zion","connor","sawyer","arthur","ryder","archer","lorenzo","declan","emiliano","luis","diego","george","evan","jaxson","carlos","graham","juan","kingston","nathaniel","matteo","legend","malachi","jason","leon","dawson","bryson","amari","calvin","ivan","chase","cole","ashton","ace","arlo","dean","brayden","jude","hayden","max","matias","rhett","jayce","elliott","alan","braxton","kaiden","zachary","jesus","emmanuel","adonis","charlie","judah","tyler","elliot","antonio","emilio","camden","stetson","maxwell","ryker","justin","kevin","messiah","finn","bentley","ayden","zayden","felix","nicolas","miguel","maddox","beckett","tate","caden","beckham","andres","alejandro","alex","jesse","brody","tucker","jett","barrett","knox","hayes","peter","timothy","joel","edward","griffin","xander","oscar","victor","abraham","brandon","abel","richard","callum","riley","patrick","karter","malakai","eric","grant","israel","milan","gavin","rafael","tatum","kairo","elian","kyrie","louis","lukas","javier","nico","avery","rory","aziel","ismael","jeremy","zayn","cohen","simon","marcus","steven","mark","dallas","tristan","lane","blake","paul","paxton","bryce","nash","crew","kash","kenneth","omar","colt","lennox","king","walter","emerson","phoenix","jaylen","derek","muhammad","ellis","kaleb","preston","jorge","zane","kayson","cade","tobias","otto","kaden","remington","atticus","finley","holden","jax","cash","martin","ronan","maximiliano","malcolm","romeo","josue","francisco","bodhi","cyrus","koa","angelo","aidan","jensen","erick","hendrix","warren","bryan","cody","leonel","onyx","ali","andre","jaziel","clayton","saint","dante","reid","casey","brian","gideon","niko","maximus","colter","kyler","brady","zyaire","cristian","cayden","harvey","cruz","dakota","damien","manuel","anderson","cairo","colin","joaquin","ezequiel","karson","callan","briggs","khalil","wade","jared","fernando","ari","colson","kylian","archie","banks","bowen","kade","daxton","jaden","rhys","sonny","zander","eduardo","iker","sullivan","bradley","raymond","odin","spencer","stephen","prince","brantley","killian","kamari","cesar","dariel","eithan","mathias","ricardo","orion","titus","luciano","rylan","pablo","chance","travis","kohen","marco","jay","malik","hector","edwin","armani","bodie","shiloh","marshall","remy","russell","baylor","kameron","tyson","grady","oakley","baker","winston","kane","julius","desmond","royal","sterling","mario","kylo","sergio","jake","kashton","shepherd","franklin","ibrahim","ares","koda","lawson","hugo","kyle","kyson","kobe","pedro","santino","wilder","sage","raiden","damon","nasir","sean","forrest","kian","reed","tanner","jalen","apollo","zayne","nehemiah","edgar","johnny","clark","eden","gunner","isaias","esteban","hank","alijah","solomon","wells","sutton","royce","callen","reece","gianni","noel","quinn","raphael","corbin","erik","tripp","atreus","francis","kayce","callahan","devin","troy","sylas","fabian","zaire","donovan","johnathan","frank","lewis","moshe","adan","alexis","tadeo","ronin","marcos","kieran","leonidas","bo","kendrick","ruben","camilo","garrett","matthias","emanuel","jeffrey","collin","lucian","augustus","memphis","rowen","yusuf","finnegan","makai","lionel","caiden","rodrigo","uriel","lucca","philip","andy","kaison","jaiden","porter","jasiah","ridge","frederick","amiri","rocco","asa","ayaan","kason","denver","dalton","major","valentino","allen","kolton","zaiden","ariel","rome","ford","leland","marcelo","seth","jamir","leandro","miller","roberto","alessandro","gregory","hezekiah","jonas","cassian","deacon","jaxton","keanu","alonzo","moises","conrad","drew","bruce","mohamed","anakin","soren","mack","pierce","kylan","princeton","zain","trevor","morgan","ozzy","roy","dominick","shane","hamza","moses","dax","lawrence","ander","ledger","enrique","rayan","johan","saul","jamari","armando","kaysen","samson","azariah","maximilian","rio","braylen","julio","mohammad","cassius","kasen","maximo","omari","clay","izaiah","lian","emir","jaime","samir","gerardo","kaizen","zachariah","jayson","albert","taylor","sincere","cillian","gunnar","boone","raul","jamie","jayceon","scott","westin","danny","arjun","kamden","colby","peyton","koen","nikolai","dorian","ocean","louie","layton","ronald","jase","kyro","benson","davis","huxley","kenzo","conor","mohammed","arturo","phillip","augustine","reign","yosef","kareem","keegan","vicente","salem","reese","fletcher","shawn","braylon","alden","julien","cannon","chaim","gustavo","boston","zeke","eliam","corey","dennis","madden","marvin","elio","krew","ahmed","layne","nikolas","mac","otis","harlan","azriel","emmitt","brixton","donald","musa","amos","jamison","dario","roland","zakai","aarav","caspian","finnley","raylan","mauricio","briar","wilson","chosen","sam","tru","trace","waylen","quincy","santana","creed","jakari","westley","amias","azrael","drake","duke","ahmad","axton","chandler","hassan","houston","tommy","eliseo","dustin","leonard","kyree","truett","abdiel","azael","ezrah","zamir","dexter","salvador","uriah","ryland","zyair","karim","lee","rhodes","bruno","case","mylo","valentin","abram","avyaan","cal","keith","alvaro","enoch","trey","clyde","nathanael","khai","rex","zaid","dutton","skyler","tomas","wylder","darius","crue","jakai","zayd","gage","riggs","wayne","jiraiya","junior","aryan","carmelo","conner","alberto","alfredo","loyal","douglas","vincenzo","aron","casen","forest","avi","bellamy","emery","bridger","brock","misael","lennon","zahir","boden","derrick","dilan","roger","marcel","rayden","jefferson","alvin","kaiser","blaze","dillon","magnus","quentin","ray","dakari","lachlan","ty","abdullah","chris","orlando","yael","gian","benicio","franco","evander","flynn","harry","robin","sevyn","hugh","aries","cason","idris","ambrose","issac","yehuda","brycen","cayson","rey","santos","ben","nelson","wes","westyn","khaza","bjorn","kiaan","seven","watson","gatlin","izael","stanley","allan","jahmir","landen","neil","quinton","chozen","noe","reuben","damir","bear","jimmy","kannon","lance","melvin","remi","yousef","lochlan","arian","kenji","khari","rohan","legacy","edison","emory","rudy","eliel","aden","byron","dereck","everest","yahir","guillermo","alec","brodie","massimo","mitchell","anders","alonso","jaxxon","tony","jireh","kingsley","jerry","ayan","brayan","ramon","jagger","elisha","vihaan","teo","eddie","judson","leif","trenton","grey","joziah","felipe","jesiah","zyon","kyaire","ernesto","ishaan","matheo","ricky","fisher","keaton","kylen","marcellus","izan","leroy","jedidiah","ignacio","ira","zev","mustafa","yahya","aurelio","brendan","calum","jericho","nixon","demetrius","eiden","rocky","langston","jovanni","mathew","landyn","murphy","axl","dane","jrue","justice","kellan","semaj","thaddeus","curtis","dash","zavier","devon","joe","joey","jon","harlem","jairo","ryatt","salvatore","van","zechariah","coleson","eugene","kellen","alistair","colten","jabari","lucien","castiel","cain","harold","alfred","benedict","shmuel","duncan","ermias","yadiel","imran","kaisen","zen","eren","kolson","kye","jasiel","kyren","marlon","palmer","adler","aldo","meir","osiris","ameer","kartier","wesson","ahmir","mordechai","nova","randy","shepard","talon","vance","asaiah","boaz","kenai","jones","carl","stefan","deandre","kelvin","leighton","yaakov","foster","rishi","yisroel","darwin","neo","titan","maurice","mccoy","alfonso","henrik","jeremias","kole","mael","true","veer","jadiel","karsyn","mekhi","atharv","darren","eliezer","gordon","mikael","stone","wren","ephraim","osman","ulises","kody","thatcher","abner","cullen","damari","hollis","olivia","emma","charlotte","amelia","sophia","mia","isabella","ava","evelyn","luna","harper","sofia","camila","eleanor","elizabeth","violet","scarlett","emily","hazel","lily","gianna","aurora","penelope","aria","nora","chloe","ellie","mila","avery","layla","abigail","ella","isla","eliana","nova","madison","zoe","ivy","grace","lucy","willow","emilia","riley","naomi","victoria","stella","elena","hannah","valentina","maya","zoey","delilah","leah","lainey","lillian","paisley","genesis","madelyn","sadie","sophie","leilani","addison","natalie","josephine","alice","ruby","claire","kinsley","everly","emery","adeline","kennedy","maeve","audrey","autumn","athena","eden","iris","anna","eloise","jade","maria","caroline","brooklyn","quinn","aaliyah","vivian","liliana","gabriella","hailey","sarah","savannah","cora","madeline","natalia","ariana","lydia","lyla","clara","allison","aubrey","millie","melody","ayla","serenity","bella","skylar","josie","lucia","daisy","raelynn","eva","juniper","samantha","elliana","eliza","rylee","nevaeh","hadley","alaia","parker","julia","amara","rose","charlie","ashley","remi","georgia","adalynn","melanie","amira","margaret","piper","brielle","mary","freya","cecilia","esther","arya","sienna","summer","peyton","sage","valerie","magnolia","emersyn","catalina","margot","everleigh","alina","sloane","brianna","oakley","valeria","blakely","kehlani","oaklynn","ximena","isabelle","juliette","emerson","amaya","elsie","isabel","mackenzie","genevieve","anastasia","reagan","katherine","ember","june","bailey","andrea","reese","wrenley","gemma","ada","alani","callie","kaylee","olive","rosalie","myla","alana","ariella","kaia","ruth","arianna","sara","jasmine","phoebe","adaline","river","hallie","adalyn","wren","presley","lilah","alora","amy","norah","annie","zuri","alexandra","sutton","noelle","kylie","molly","lia","journee","leia","evangeline","lila","aspen","saylor","khloe","aitana","alaina","haven","aliyah","blake","kimberly","vera","ana","kailani","tatum","arabella","diana","selena","kiara","harmony","lilith","rowan","delaney","vivienne","zara","collins","harlow","blair","leila","daphne","faith","lennon","stevie","mariana","kaylani","morgan","juliana","gracie","nyla","miriam","daniela","dahlia","brynlee","rachel","angela","lilly","kamila","samara","ryleigh","taylor","dakota","lola","talia","evie","jordyn","ophelia","camille","gia","milani","lena","elaina","malia","elise","celeste","londyn","palmer","mabel","octavia","sawyer","jane","finley","marley","adelaide","lucille","shiloh","antonella","ariel","poppy","kali","elianna","juliet","maisie","cataleya","danna","aubree","gabriela","noa","brooke","celine","alessia","hope","selah","vanessa","rory","sydney","amari","teagan","adriana","payton","rosemary","laila","london","angelina","alayna","kendall","rebecca","maggie","adelyn","evelynn","thea","amina","tessa","kayla","esme","mckenna","nicole","regina","luciana","julianna","nayeli","catherine","alyssa","journey","dream","camilla","ariyah","nina","joanna","mya","annabelle","esmeralda","lauren","fatima","giselle","harley","jocelyn","phoenix","trinity","malani","heidi","meadow","raya","paige","jayla","logan","leighton","charlee","viviana","madilyn","raven","amora","navy","itzel","laura","emory","azalea","hayden","aniyah","winter","aurelia","alivia","brooklynn","francesca","serena","lilliana","gracelynn","kalani","aisha","gwendolyn","elaine","nylah","hattie","wynter","adelynn","adelina","alessandra","mylah","alayah","anaya","julieta","rosie","mariah","demi","raelyn","sabrina","helen","everlee","astrid","fiona","michelle","xiomara","briella","alexandria","frances","sunny","sarai","alaya","melissa","veronica","mira","zariah","brynn","reign","maryam","lana","arielle","raegan","remington","salem","elisa","aylin","emely","carolina","sylvie","sylvia","annalise","willa","mallory","kira","daniella","elora","saige","carmen","charli","mckenzie","matilda","miracle","destiny","alicia","elle","colette","anya","madeleine","oaklee","skye","cali","daleyza","alexis","holly","katalina","miley","alanna","felicity","joy","helena","makayla","amirah","maia","armani","alma","anahi","ari","bianca","scarlet","amiyah","dorothy","stephanie","fernanda","briana","alison","lorelai","renata","macie","makenna","imani","jimena","kate","liana","cameron","lyra","maddison","izabella","amanda","lorelei","dayana","gracelyn","opal","nadia","brinley","madelynn","calliope","paris","camryn","danielle","cassidy","cecelia","haisley","jordan","faye","marlee","bonnie","allie","edith","emmy","mae","kaliyah","oakleigh","meredith","carter","kamryn","ariah","maxine","heaven","april","blaire","jennifer","leona","murphy","ivory","florence","lexi","angel","alondra","hanna","rhea","bristol","amalia","katie","monroe","emelia","maliyah","kora","ariya","mariam","lyric","makenzie","frankie","jacqueline","jazlyn","legacy","margo","clementine","maren","paislee","alejandra","sevyn","jolene","averie","briar","yaretzi","gabrielle","jessica","rylie","alia","zahra","emerie","lilian","arleth","virginia","avianna","royalty","azariah","kenzie","kyla","sierra","halo","holland","reyna","thalia","keira","capri","marina","noemi","amber","miranda","sariyah","rosalia","indie","oaklyn","anne","mara","lina","wrenlee","mina","louise","beatrice","jovie","ivanna","nalani","journi","marceline","ailani","myra","mavis","aliana","kinley","ainsley","jaylani","eve","iyla","leyla","alexa","arlet","lylah","charleigh","chaya","cleo","tiana","estella","nellie","winnie","yara","mikayla","dallas","sasha","scottie","hadassah","amani","ila","kaitlyn","ellianna","abby","skyler","amaia","freyja","romina","lennox","jenna","kennedi","kayleigh","melany","amoura","mckinley","angelica","keilani","michaela","zariyah","cassandra","noah","remy","nia","reina","milan","jazmin","davina","della","dylan","marie","galilea","violeta","jaliyah","jenesis","melina","isabela","priscilla","emberly","erin","aliza","eileen","shelby","kelsey","laney","siena","braelynn","analia","elliott","rosa","aleena","leslie","gloria","kataleya","martha","irene","clover","penny","ryan","kaeli","taytum","karsyn","kathryn","estrella","adrianna","flora","goldie","halle","haley","sloan","fallon","macy","vienna","janelle","elowyn","megan","azari","maci","aya","kyra","lillie","milena","birdie","liv","christina","novah","zelda","paula","julie","selene","khaleesi","chelsea","estelle","karla","chana","marigold","laurel","promise","rayna","alisson","bethany","jemma","yareli","adalee","andi","coraline","hana","kiana","madilynn","monica","charley","dior","arlette","lara","whitley","love","zaniyah","inaya","angie","elodie","nola","rivka","kendra","marilyn","aleah","emerald","persephone","addilyn","amayah","bridget","giana","johanna","kenna","milana","baylor","brynleigh","kensley","zaria","ellis","aviana","lacey","leilany","drew","ezra","lenora","loretta","adley","novalee","aila","karina","adhara","georgina","emmie","theodora","kelly","kylee","lottie","malaysia","paulina","lakelynn","dani","denver","dulce","jamie","sky","carly","kinslee","marisol","henley","jayleen","jream","cheyenne","maisy","noor","robin","savanna","ramona","aileen","kaiya","emberlynn","jessie","zayla","lea","samira","araceli","azaria","pearl","elyse","hunter","kori","louisa","kamari","nyomi","skyla","treasure","alexia","gwen","alena","tallulah","veda","mikaela","kya","scout","valery","adele","livia","naya","ocean","iliana","bellamy","celia","vada","zaylee","ashlyn","mercy","zendaya","berkley","marlowe","arely","aspyn","maddie","avani","belen","linda","luz","teresa","meilani","nala","malaya","amiri","anais","lisa","ivey","katelyn","dania","zoya","ailany","artemis","rayne","brittany","cielo","janiyah","kallie","yasmin","zora","aliya","billie","elia","khalani","rosalina","zhuri","ainara","alitzel","stormi","cynthia","elina","lilianna","zainab","barbara","ensley","miller","waverly","winona","jaycee","andie","kimber","marianna","keyla","baylee","emryn","giuliana","karter","liberty","sol","amelie","hadlee","harmoni","tiffany","chandler","elliot","lilyana","nori","salma","dalia","judith","madalyn","raquel","jolie","keily","magdalena","yamileth","bria","amaris","harlee","august","ayleen","kimora","braelyn","kamiyah","indy","princess","ruthie","ashlynn","jazmine","laylani","marleigh","raina","roselyn","simone","anika","lakelyn","luella","nataly","giovanna","greta","solana","bailee","joelle","kara","etta","julissa","kai","avayah","nancy","alianna","ayra","sarahi","eleanora","kenia","emmeline","luisa","xyla","cadence","reya","blessing","elouise","emiliana","annika","lilia","mazie","saoirse","aura","aleyna","kassidy","carla","indigo","saanvi","tru","winifred","layne","malayah","dana","deborah","hayley","sapphire","seraphina","kahlani","nyra","quincy","soleil","allyson","paloma","whitney","laylah","violette","kairi","leanna","natasha","ainhoa","alaiya","esperanza","amyra","clare","neriah","araya","aadhya","elisabeth","sariah","shay","angelique","ayah","aylani"]
    entities = [
        'Address', 'Email', 'Phone Number', 'URL'
    ]

    handleScanGallery() {
        this.scanDocument("PHOTO_LIBRARY"); 
    }

    handleScanCamera() {
        this.scanDocument("DEVICE_CAMERA");
    }

    unidentified = [];
    identified = {};
    scanDocument(imageSource) {
        this.resetScanResults();
        const myScanner = getDocumentScanner();
        if (myScanner.isAvailable()) {
            const options = {
                imageSource,
                scriptHint: "LATIN",
                returnImageBytes: true,
                extractEntities: true,  
                entityExtractionLanguageCode: "en",
            }

            myScanner.scan(options).then(results => {
                // this.text = JSON.stringify(results[0])
                const document = results[0]

                this.identified = document.entities.reduce((cml, cur, idx) => ({
                    ...cml,
                    [cur.value]: cur.type
                }), {})

                for (const textBlock of document.blocks) {
                    loop2:
                    for (const textLine of textBlock.lines) {
                        for (const textElement of textLine.elements) {
                            const toLowerCase = textElement.text.toLowerCase()
                            const namesArrayIncludesText = this.names.includes(toLowerCase)
                            const titlesArrayIncludesText = this.titles.includes(toLowerCase)
                            if (namesArrayIncludesText || titlesArrayIncludesText) {
                                this.identified[textLine.text] = namesArrayIncludesText ? "NAME" : "TITLE" 
                                continue loop2 // skip the remaining line if we have identified it already
                            }
                        }
                        
                        // store unidentified, try not to have dupes
                        let textLineIdentified = false;
                        for (const key in this.identified) {
                            if (textLine.text.includes(key) || key.includes(textLine.text)) {
                                textLineIdentified = true;
                            }
                        }
                        if (!textLineIdentified) {
                            this.unidentified.push(textLine.text);
                        }
                    }
                }
                
                for (const key in this.identified) {
                    //sometimes identifies zip code as PHONE
                    if (this.identified[key] == "PHONE" && key.length <=8) {
                        delete this.identified[key]
                    }
                }

                createRecord({
                    'apiName': 'Mobile_Capability__c',
                    'fields': {
                        'Name': `Scan Camera - ${new Date()}`,
                        'Data__c': JSON.stringify(this.identified, null, 2),
                        'Data2__c': JSON.stringify(this.unidentified, null, 2),
                    }
                }).then(record => {
                    const trimmedString = results[0].imageBytes.replace('data:image/jpeg;base64,', '');
                    const imageContent = atob(trimmedString);
                    const buffer = new ArrayBuffer(imageContent.length);
                    const view = new Uint8Array(buffer);
                    
                    for (let n = 0; n < imageContent.length; n++) {
                        view[n] = imageContent.charCodeAt(n);
                    }

                    const type = 'image/jpeg';
                    const blob = new Blob([buffer], { type });
                    const file =  new File([blob], record.id, { lastModified: new Date().getTime(), type });
                    createRecord({
                        apiName: 'ContentVersion',
                        fields: {
                            Title: `${record.id}-image`,
                            PathOnClient: `${record.id}.png`,
                            VersionData: window.btoa(imageContent),
                            Description: 'test',
                        }
                    }).then(cv => {
                        // somehow content document id not returned here, but queryable in APEX
                        createLink({ contentVersionId: cv.id, recordId: record.id })
                        // this.dispatchEvent(new ShowToastEvent({title: JSON.stringify(cv, null, 2), variant: 'info', message: 'Hi'}))
                        // createRecord({
                        //     apiName: 'ContentDocumentLink',
                        //     fields: {
                        //         ContentDocumentId: cv.fields.ContentDocumentId.value,
                        //         LinkedEntityId: record.id, 
                        //     }
                        // })
                    })
                }).catch(error => {
                    this.dispatchEvent(new ShowToastEvent({
                        title: reduceErrors(error),
                        variant: 'error',
                    }))
                })
            }).catch(error => {
                this.text = "Error: " + error.message
            })
        } else {
            this.text = "Error initiating scan"
        }
    }

    resetScanResults() {
        this.scannedDocument = null;
        this.text = null;
        this.unidentified = [];
    }

    async handleReadClick() {
        let isUser = false;
        try {
            isUser = await this.verifyUser()
        } catch(error) {
            console.error('error');
        }

        const nfcService = getNfcService();
        if (isUser && nfcService.isAvailable()) {
            const options = {
                "instructionText": "Hold your phone near the tag to read.",
                "successText": "Tag read successfuly!"
            }
            nfcService.read(options).then(result => {
                this.text = JSON.stringify(result, null, 2)
            }).catch(error => {
                this.text = error.message;
            })
        } else {
            this.text = 'Problem initiating NFC service.'
        }
    }
}


/* 
 *
Did you know Salesforce provides a mobileCapabilities module for Lightning Web Components (LWCs) to allow us to utilise native mobile features in our LWCs? I’ll be sharing a little about the BiometricsService and DocumentScanner API. Note that these are MOBILE-ONLY features.

The BiometricsService allows you to tap into your mobile’s biometrics capabilities, i.e. face recognition/fingerprint sensor by calling the checkUserIsDeviceOwner method.
You can pass an object as parameter to the method, specifying the text that appears when requesting for biometrics permission, and also what to fallback on when biometrics aren't available (i.e. Pin code)
There are multiple other methods you can call beforehand, such as isAvailable() and isBiometricsReady(), to ensure that biometrics are available and ready

Some ideas (Remember: just because you can doesn't mean you should)
Crazy idea: Put an invisible LWC on EVERY single page and action, so that every time a user accesses any record or attempts to do anything, it triggers a biometric check.
Sensible idea: Put the same invisible LWC, but only on the mobile Home page (Not sure if we are able to edit this, but should be). That way, when a user walks away with the phone unlocked and someone else opens the Salesforce app, it would trigger a biometric check.


For the DocumentScanner API, it allows you to scan a document either through the camera, or from an image in your gallery. 
It has an entity extraction feature, offered by Google's ML Kit. However, I don't find it very useful since it is unable to identify entities such as Name & Title
There is also an option parameter returnImageBytes that you can pass in to the scan function, which I believe we can utilise to convert the scanned image into a file to be stored inside salesforce as well (I have not tried)

I believe it will take a large effort to make this document scanning feature precise and error free without human intervention. Examples of complication may include: misidentifying entities, capturing wrong values due to line breaks in addresses, etc.  An implementation idea would be Lead Capturing - A sales person could take picture of all the business cards they get, and instead of manually entering them, they can utilise the document scanning feature. 

I played with it a bit, and this is my result. Note: 
I had to store 2 variables in my LWC, one which consists of hundreds of job titles, and another which consists of thousands of first names. This is to allow me to potentially identify the name and title entities, but is not a robust solution. 
But at the end of the day, if we are utilising an LWC, we can always fine tune it so that the UI/UX is so good for the user such that even when the information captured is off, the salesperson can easily modify/adjust it. (This is a good principle to keep in mind I guess, when developing custom components)



 
 *
 */
