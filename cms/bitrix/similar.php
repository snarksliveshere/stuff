  <?if($value == "similar"):
        $similarCounter = 0;
        ?>
        <?
        CModule::IncludeModule(iblock);
        $arSelect = Array("ID", "PREVIEW_PICTURE", "CODE", "CANONICAL_PAGE_URL", "NAME", 'PROPERTY_COMPLETENESS_SIZE', 'PROPERTY_FILTER_PRICE');
        $arFilter = Array("IBLOCK_ID" => "36", "ACTIVE" => "Y", "ACTIVE_FROM" => "Y", "SECTION_ID" => $arResult['IBLOCK_SECTION_ID']);
        $res = CIBlockElement::GetList(Array("ID" => "ASC"), $arFilter, false, false, $arSelect);
        ?>
        <? while ($arFields = $res->GetNext()): ?>
            <? if ($arFields['ID'] == $arResult['ID']) {
                continue;
            }
            $img_path = CFile::GetPath($arFields["PREVIEW_PICTURE"]);
            if ($similarCounter == 0) {
                echo '<h5>Похожие товары</h5>
                      <div class="flexslider" id="slides_similar_wrap">
                         <ul class="slides_similar">';
            }
            ?>
            <li class="col-md-4 col-sm-3 col-xs-6">
                <div class="item"
                     itemprop="itemListElement"
                     itemscope=""
                     itemtype="http://schema.org/ListItem">
                    <div class="inner-wrap">
                        <div class="image shine">
                            <a href="<?= $arFields['CANONICAL_PAGE_URL'] ?>" class="blink-block">
                                <img class="img-responsive"
                                     src="<?= $img_path ?>"
                                     alt="<?= $arFields['NAME'] ?>"
                                     itemprop="image"/>
                            </a>
                        </div>
                        <div class="text">
                            <div class="cont">
                                <div class="title">
                                    <a href="<?= $arFields['CANONICAL_PAGE_URL'] ?>"
                                       class="dark-color"
                                       itemprop="url">
                                        <span itemprop="name"><?= $arFields['NAME'] ?></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

        <? $similarCounter++;
        endwhile; ?>
        <? if ($similarCounter) {
                echo '</ul>
                   </div>
                   <div class="clearfix"></div>';
            }
        ?>
    <?endif;?>