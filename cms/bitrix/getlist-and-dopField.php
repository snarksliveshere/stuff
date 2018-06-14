<?
$filter = array(
			"IBLOCK_ID" => '12',
			"ACTIVE" => "Y",
		);
		$select = array(
			"ID", "NAME", "IBLOCK_ID", "CODE", "SECTION_PAGE_URL", "SECTION_ID", "IBLOCK_SECTION_ID"
		);
		$res = CIBlockSection::GetList(
			array('LEFT_MARGIN' => 'ASC'),
			$filter,
			false,
			$select
		);
		
		$arrMatras = [];
		while ($item = $res->GetNext(true, false))
		{
			
			if(!$item['IBLOCK_SECTION_ID']){

				$arrMatras[$item['ID']]	= [
					'NAME' => $item['NAME'],
					'URL' => $item['SECTION_PAGE_URL'],
				];
			}		

		}?>
			<div class="h3_small">Каталог</div>
			<ul>	
		<?foreach($arrMatras as $ki => $matras):?>
				<li><a href="<?=$matras['URL']?>"><?=$matras['NAME']?></a></li>
		<?endforeach;?>
			</ul>		



			DEPTH_LEVEL =1


			CModule::IncludeModule("iblock"); 
$sectId = CIBlockSection::GetList(array(), array('IBLOCK_ID'=>$arParams['IBLOCK_ID'],'=CODE' => $arResult['VARIABLES']["SECTION_CODE"]), false , array('IBLOCK_ID','SECTION_ID','ID'),array('nTopCount' => 1))->Fetch();
$contentDop = '';
$res = CIBlockSection::GetList(array(), array("IBLOCK_ID" => $arParams["IBLOCK_ID"], "ID" => $sectId), false, array("UF_CONTENT_DOP"));
while($ar_section = $res->GetNext())
{
    $contentDop = $ar_section['~UF_CONTENT_DOP'];
}