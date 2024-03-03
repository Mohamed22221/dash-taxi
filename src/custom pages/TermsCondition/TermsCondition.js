import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import FeatherIcon from "feather-icons-react";
import BreadCrumbs from "../../Components/Common/BreadCrumbs";

const TermsCondition = () => {
  document.title = "الشروط والأحكام";
  const titleData = ["الاعدادات", "الشروط والأحكام"];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumbs titleData={titleData} />
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card>
                <div className="bg-soft-info position-relative">
                  <CardBody className="p-5">
                    <div className="text-center">
                      <h3>الشروط والأحكام</h3>
                      <p className="mb-0 text-muted">
                        آخر تحديث: 16 سبتمبر 2022
                      </p>
                    </div>
                  </CardBody>
                </div>
                <CardBody className="p-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <FeatherIcon
                        icon="check-circle"
                        className="text-success icon-dual-success icon-xs"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5>القبول</h5>
                      <p className="text-muted">
                        باستخدامك mishnas.com فإنك تظهر وتقر فهمك وموافقتك على
                        الشروط والاحكام والبنود المذكورة هنا. إذا لم توافق على
                        هذه البنود، فإنه لا يجوز لك استخدام mishnas.com . إن
                        استمرارك باستخدام mishnas.com بعد إجراء أي تعديلات على
                        هذه البنود سوف يعتبر موافقة منك على هذه التعديلات. علمًا
                        بأنه قد يتم التعديل في اي وقت من الأوقات دون إبلاغك.
                        وأنك تستخدم mishnas.com على مسئوليتك الشخصية.
                      </p>

                      {/* <p className="text-muted">
                        انت توافق على الشروط والالتزامات التالية:{" "}
                      </p>
                      <ul className="text-muted">
                        <li>
                          <p>
                            هناك العديد من الأشكال المتاحة لنصوص لوريم إيبسوم ،
                            لكن الغالبية تعرضت للتغيير بشكل ما ، عن طريق إدخال
                            بعض الفكاهة أو الكلمات العشوائية التي لا تبدو قابلة
                            للتصديق إلى حد ما.
                          </p>
                        </li>
                        <li>
                          <p>
                            إذا كنت ستستخدم مقطعًا من لوريم إيبسوم ، فعليك
                            التأكد من عدم وجود أي شيء محرج مخفي في منتصف النص.
                            تميل جميع مولدات Lorem Ipsum على الإنترنت إلى تكرار
                            الأجزاء المحددة مسبقًا حسب الضرورة ، مما يجعلها أول
                            مولد حقيقي على الإنترنت.
                          </p>
                        </li>
                        <li>
                          <p>
                            من ناحية أخرى ، نشجب بسخط صالح ونكره الرجال الذين
                            خدعهم سحر متعة اللحظة وإحباطهم.
                          </p>
                        </li>
                        <li>
                          <p>
                            يستخدم قاموسًا يضم أكثر من 200 كلمة لاتينية ، جنبًا
                            إلى جنب مع حفنة من تراكيب الجملة النموذجية ، لتوليد
                            Lorem Ipsum الذي يبدو معقولًا. لذلك فإن لوريم إيبسوم
                            الذي تم إنشاؤه يكون دائمًا خاليًا من التكرار أو
                            الدعابة المحقونة أو الكلمات غير المميزة وما إلى ذلك.
                          </p>
                        </li>
                      </ul> */}
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <FeatherIcon
                        icon="check-circle"
                        className="text-success icon-dual-success icon-xs"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5>وصف mishnas.com</h5>
                      <p className="text-muted">
                        <p className="text-muted">
                          يشير مصطلح "mishnas.com" الى موقع
                          mishnas.comالإلكتروني والبرامج التابعة له. وهي خدمة
                          تقدم لمستخدمي المواقع والبرامج الالكترونية. والخدمة
                          عبارة عن موقع التقاء يسمح للمشتركين بعرض عقاراتهم
                          (شقق، منازل، اراضي، مزارع،.. الخ) للإيجار، للبيع او
                          للبدل، حيث يقوم الزوار بالبحث عن العقارات التي تناسبهم
                          باستخدام الموقع او البرامج.
                        </p>
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TermsCondition;
