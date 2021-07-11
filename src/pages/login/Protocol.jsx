import React, { PureComponent } from 'react';
import './style.less';
import MainNavBar from 'components/content/mainNavBar/MainNavBar'
import Scroll from 'components/common/scroll/Scroll';

class Protocol extends PureComponent {
  render() {
    return (
      <div className="protocol" >
        <MainNavBar title="唯妮海购用户注册协议" goBack={() => {this.goBack()}} />
        <Scroll classContent="protocol-container" probeType={3} >
          <div className="protocol-content">
            <h2>一、服务条款的确认及接受</h2>
            <p>1、唯妮海购（www.weinihaigou.com，以下称“本网站”）各项电子服务的所有权和运作权归属于浙江妮素网络科技股份有限公司版权所有，未经授权禁止复制或建立镜像。</p>
            <p>2、根据国家法律法规变化及本网站运营需要，唯妮海购有权对本协议条款及相关规则不时地进行修改，修改后的内容一旦以任何形式公布在本网站上即生效，并取代此前相关内容，您应不时关注本网站公告、提示信息及协议、规则等相关内容的变动。您知悉并确认，如您不同意更新后的内容，应立即停止使用本网站；如您继续使用本网站，即视为知悉变动内容并同意接受。</p>
            <h2>二、服务需知</h2>
            <p>1、用户注册成功后，唯妮海购将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</p>
            <p>2、用户须对在唯妮海购的注册信息的真实性、合法性、有效性承担全部责任，用户不得冒充他人；不得利用他人的名义发布任何信息；不得恶意使用注册帐户导致其他用户误认；否则唯妮海购有权立即停止提供服务，收回其帐号并由用户独自承担由此而产生的一切法律责任。</p>
            <p>3、用户承诺不得以任何方式利用唯妮海购直接或间接从事违反中国法律、以及社会公德的行为，唯妮海购有权对违反上述承诺的内容予以删除。</p>
            <h2>三、订单</h2>
            <p>1、使用本网站下订单，您应具备购买相关商品的权利能力和行为能力，如果您在18周岁以下，您需要在父母或监护人的监护参与下才能使用本网站。在下订单的同时，即视为您满足上述条件，并对您在订单中提供的所有信息的真实性负责。</p>
            <p>2、在您下订单时，请您仔细确认所购商品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。收货人与您本人不一致的，收货人的行为和意思表示视为您的行为和意思表示，您应对收货人的行为及意思表示的法律后果承担连带责任。</p>
            <p>3、您理解并同意：本网站上销售商展示的商品和价格等信息仅仅是要约邀请，您下单时须填写您希望购买的商品数量、价款及支付方式、收货人、联系方式、收货地址（合同履行地点）、合同履行方式等内容；系统生成的订单信息是计算机信息系统根据您填写的内容自动生成的数据，仅是您向销售商发出的合同要约；销售商收到您的订单信息后，只有在销售商将您在订单中订购的商品从仓库实际直接向您发出时（以商品出库为标志），方视为您与销售商之间就实际直接向您发出的商品建立了合同关系；如果您在一份订单里订购了多种商品并且销售商只给您发出了部分商品时，您与销售商之间仅就实际直接向您发出的商品建立了合同关系；只有在销售商实际直接向您发出了订单中订购的其他商品时，您和销售商之间就订单中其他已实际直接向您发出的商品才成立合同关系。</p>
            <p>4、尽管销售商做出最大的努力，但由于市场变化及各种以合理商业努力难以控制因素的影响，本网站无法避免您提交的订单信息中的商品出现缺货情况；如您下单所购买的商品发生缺货，您有权取消订单，销售商亦有权自行取消订单，若您已经付款，则为您办理退款。</p>
            <h2>四、配送</h2>
            <p>1、您在本网站购买的商品将按照本网站上您所指定的送货地址进行配送。订单信息中列出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的。您应当清楚准确地填写您的送货地址、联系人及联系方式等配送信息，您知悉并确认，您所购买的商品应仅由您填写的联系人接受身份查验后接收商品，因您变更联系人或相关配送信息而造成的损失由您自行承担。</p>
            <p>2、因如下情况造成订单延迟或无法配送等，本网站将无法承担迟延配送的责任：</p>
            <p>(1)客户提供错误信息和不详细的地址；</p>
            <p>(2)货物送达无人签收，由此造成的重复配送所产生的费用及相关的后果。</p>
            <p>(3)不可抗力，例如：自然灾害、交通戒严、突发战争等。</p>
            <h2>五、用户个人信息保护及授权</h2>
            <p>1、您知悉并同意，为方便您使用本网站相关服务，本网站将存储您在使用时的必要信息，包括但不限于您的真实姓名、性别、生日、配送地址、联系方式、通讯录、相册、日历、定位信息等。除法律法规规定的情形外，未经您的许可唯妮海购不会向第三方公开、透露您的个人信息。唯妮海购对相关信息采取专业加密存储与传输方式，利用合理措施保障用户个人信息的安全。</p>
            <p>2、您知悉并确认，您在注册帐号或使用本网站的过程中，需要提供真实的身份信息，唯妮海购将根据国家法律法规相关要求，进行基于移动电话号码的真实身份信息认证。若您提供的信息不真实、不完整，则无法使用本网站或在使用过程中受到限制，同时，由此产生的不利后果，由您自行承担。</p>
            <p>3、您在使用本网站某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为“单独协议”），您在使用该项服务前请阅读并同意相关的单独协议；您使用前述特定服务，即视为您已阅读并同意接受相关单独协议。</p>
            <p>4、您充分理解并同意：</p>
            <p>(1)接收通过邮件、短信、电话等形式，向在本网站注册、购物的用户、收货人发送的订单信息、促销活动等内容；</p>
            <p>(2)为配合行政监管机关、司法机关执行工作，在法律规定范围内唯妮海购有权向上述行政、司法机关提供您在使用本网站时所储存的相关信息，包括但不限于您的注册信息等，或使用相关信息进行证据保全，包括但不限于公证、见证等；</p>
            <p>(3)唯妮海购依法保障您在使用过程中的知情权和选择权，在您使用本网站服务过程中，涉及您设备自带功能的服务会提前征得您同意，您一经确认，唯妮海购有权开启包括但不限于收集地理位置、读取通讯录、使用摄像头、启用录音等提供服务必要的辅助功能。</p>
            <p>(4)唯妮海购有权根据实际情况，在法律规定范围内自行决定单个用户在本网站及服务中数据的最长储存期限以及用户日志的储存期限，并在服务器上为其分配数据最大存储空间等。</p>
            <h2>六、用户行为规范</h2>
            <p>1、本协议依据国家相关法律法规规章制定，您同意严格遵守以下义务：</p>
            <p>(1)不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；</p>
            <p>(2)从中国大陆向境外传输资料信息时必须符合中国有关法规；</p>
            <p>(3)不得利用本网站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；</p>
            <p>(4)不得干扰本网站的正常运转，不得侵入本网站及国家计算机信息系统；</p>
            <p>(5)不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；</p>
            <p>(6) 不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；</p>
            <p>(7)不得教唆他人从事本条所禁止的行为；</p>
            <p>(8)不得利用在本网站注册的账户进行牟利性经营活动；</p>
            <p>(9)不得发布任何侵犯他人隐私、个人信息、著作权、商标权等知识产权或合法权利的内容；</p>
            <p>2、您须对自己在网上的言论和行为承担法律责任，您若在本网站上散布和传播反动、色情或其它违反国家法律的信息，本网站的系统记录有可能作为您违反法律的证据。</p>
            <h2>七、违约责任</h2>
            <p>1、如果唯妮海购发现或收到他人举报投诉您违反本协议约定的，唯妮海购有权不经通知随时对相关内容进行删除、屏蔽，并视行为情节对违规帐号处以包括但不限于警告、限制或禁止使用部分或全部功能、帐号封禁直至注销的处罚，并公告处理结果。</p>
            <p>2、唯妮海购有权依据合理判断对违反有关法律法规或本协议规定的行为采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，您应独自承担由此而产生的一切法律责任。</p>
            <p>3、您理解并同意，因您违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，您应当独立承担责任；唯妮海购因此遭受损失的，您也应当一并赔偿。</p>
            <p>4、除非另有明确的书面说明，唯妮海购不对本网站的运营及其包含在本网站上的信息、内容、材料、产品（包括网站）或服务作任何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。</p>
            <h2>八、所有权及知识产权</h2>
            <p>1、您一旦接受本协议，即表明您主动将您在任何时间段在本网站发表的任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等任何可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给唯妮海购所有，并且您同意唯妮海购有权就任何主体侵权而单独提起诉讼。</p>
            <p>2、本协议已经构成《中华人民共和国著作权法》第二十五条（条文序号依照2010年修订版《著作权法》确定）及相关法律规定的著作财产权等权利转让书面协议，其效力及于您在唯妮海购上发布的任何受著作权法保护的作品内容，无论该等内容形成于本协议订立前还是本协议订立后。</p>
            <p>3、您同意并已充分了解本协议的条款，承诺不将已发表于本网站的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。</p>
            <p>4、除法律另有强制性规定外，未经唯妮海购明确的特别书面许可,任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本网站的信息内容，否则，唯妮海购有权追究其法律责任。</p>
            <p>5、本网站所刊登的资料信息（诸如文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据编辑和网站），均是唯妮海购或其内容提供者的财产，受中国和国际版权法的保护。本网站上所有内容的汇编是唯妮海购的排他财产，受中国和国际版权法的保护。本网站上所有软件都是唯妮海购或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。</p>
            <h2>九、法律管辖适用及其他</h2>
            <p>1、本协议的订立、执行和解释及争议的解决均应适用中国法律。如双方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向协议签订地人民法院提起诉讼。本协议签订地为中华人民共和国杭州市西湖区。</p>
            <p>2、如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。</p>
            <p>3、本协议未明示授权的其他权利仍由唯妮海购保留，您在行使这些权利时须另外取得唯妮海购的书面许可。唯妮海购如果未行使前述任何权利，并不构成对该权利的放弃。</p>
            <p>4、您注册即视为您完全接受本协议，在注册之前请您再次确认已知悉并完全理解本协议的全部内容。</p>
          </div>
        </Scroll>
      </div>
    );
  }
  goBack() {
    this.props.history.go(-1);
  }
}

export default Protocol;