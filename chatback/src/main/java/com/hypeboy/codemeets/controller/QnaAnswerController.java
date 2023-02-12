package com.hypeboy.codemeets.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hypeboy.codemeets.model.dto.QnaAnswerDto;
import com.hypeboy.codemeets.model.service.QnaAnswerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api/answer")
@Api(tags = "그룹 Q&A 답변 API")
public class QnaAnswerController {

	private static final Logger Logger = LoggerFactory.getLogger(QnaController.class);
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	private QnaAnswerService service;

	@Autowired
	public QnaAnswerController(QnaAnswerService service) {
		super();
		this.service = service;
	}
	
	@PostMapping
	public ResponseEntity<String> writeQnaAnswer(@RequestBody @ApiParam(value = "qnaAnswer 정보.", required = true) QnaAnswerDto qnaAnswerDto) throws Exception {
		
		Logger.info("wirteAnswerQna - 호출");
		
		try {
			service.writeQnaAnswer(qnaAnswerDto);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
            Logger.warn("writeQnaAnswer fail - " + e);

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/list/{questionPk}")
	public ResponseEntity<?> getList(@PathVariable("questionPk") int groupQnaAnswerPk,
			@RequestParam int userPk,
			@RequestParam("nowPage") int nowPage,
			@RequestParam("items") int items) throws Exception {
		
		System.out.println("qna list hi");
		try {
			List<QnaAnswerDto> qnaAnswerDtoList = service.getList(groupQnaAnswerPk, userPk, (nowPage -1) * items, items);
			return new ResponseEntity<List<QnaAnswerDto>>(qnaAnswerDtoList, HttpStatus.OK);
		} catch (Exception e) {
            Logger.warn("getList fail - " + e);

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/{qnaAnswerPK}")
	public ResponseEntity<?> getQna(@PathVariable("qnaAnswerPK") int qnaAnswerPk, @RequestParam int userPk) throws Exception {
		
		System.out.println("info hi");
		try {
			return new ResponseEntity<QnaAnswerDto>(service.getQnaAnswer(qnaAnswerPk, userPk), HttpStatus.OK);
		} catch (Exception e) {
            Logger.warn("getQna fail - " + e);

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping
	public ResponseEntity<String> modifyQna(@RequestBody QnaAnswerDto qnaAnswerDto) throws Exception {
		

		try {
			service.modifyQnaAnswer(qnaAnswerDto);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
            Logger.warn("modifyQna fail - " + e);

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/{qnaAnswerPK}")
	public ResponseEntity<String> deleteQnaAnswer(@PathVariable("qnaAnswerPK")int qnaAnswerPK) throws Exception {
		
		Logger.info("deleteQna - 호출");
		
		try {
			service.deleteQnaAnswer(qnaAnswerPK);
			return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
		} catch (Exception e) {
            Logger.warn("deleteQnaAnswer fail - " + e);

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/like")
	public ResponseEntity<String> likeQna(@RequestBody QnaAnswerDto qnaAnswerDto) throws Exception {
		
		Logger.info("likeQnaAnswer - 호출");
		
		try {
			service.likeQnaAnswer(qnaAnswerDto);
			return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
		} catch (Exception e) {
            Logger.warn("likeQna fail - " + e);

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
}
