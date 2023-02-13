package com.hypeboy.codemeets.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GroupNoticeDto {
	private int groupNoticePk;
	
	@ApiModelProperty(value="그룹 공지 제목", example = "공지 제목 예시", required = true)
	private String groupNoticeTitle;
	
	@ApiModelProperty(value="그룹 공지 내용", example = "공지 내용 예시", required = true)
	private String groupNoticeContents;

	@ApiModelProperty(value="첨부파일 원본 파일명", example = "codemeets 개발계획.txt")
	private String originFilename;
	
	@ApiModelProperty(value="첨부파일 서버에 저장된 파일명", example = "1asd33243-asda192.txt")
	private String dbFilename;
	
	private String groupNoticeDate;
	
	private String userName;

	@ApiModelProperty(value="그룹 공지 PK", example = "1", required = true)
	private int groupPk;

	@ApiModelProperty(value="그룹 공지 작성하는 유저의 PK", example = "1", required = true)
	private int userPk;
	
	private int groupNoticeHit;
	
	private int total;
	
}
