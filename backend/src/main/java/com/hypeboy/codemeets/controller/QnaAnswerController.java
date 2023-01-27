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

import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/answer")
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
		
		if (service.writeQnaAnswer(qnaAnswerDto) != 0) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else
			return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/list/{questionPk}")
	public ResponseEntity<?> getList(@PathVariable("questionPk") int questionPk) throws Exception {
		
		System.out.println("qna list hi");
		List<QnaAnswerDto> qnaAnswerDtoList = service.getList(questionPk);
		
		return new ResponseEntity<List<QnaAnswerDto>>(qnaAnswerDtoList, HttpStatus.OK);
	}
	
	@GetMapping("/{qnaAnswerPK}")
	public ResponseEntity<?> getQna(@PathVariable("qnaAnswerPK") int qnaAnswerPK, @RequestParam int userPk) throws Exception {
		
		System.out.println("info hi");
		
		return new ResponseEntity<QnaAnswerDto>(service.getQnaAnswer(qnaAnswerPK, userPk), HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<String> modifyQna(@RequestBody QnaAnswerDto qnaAnswerDto) throws Exception {
		
		System.out.println("qna modify");
		
		Logger.info("modifyQnaAnswer - 호출 {}", qnaAnswerDto);
		
		if (service.modifyQnaAnswer(qnaAnswerDto)!=0) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.OK);
	}
	
	@DeleteMapping("/{qnaAnswerPK}")
	public ResponseEntity<String> deleteQnaAnswer(@PathVariable("qnaAnswerPK")int qnaAnswerPK) throws Exception {
		
		Logger.info("deleteQna - 호출");
		
		if (service.deleteQnaAnswer(qnaAnswerPK)!=0) {
			return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL,HttpStatus.NO_CONTENT);
	}
	
	@PutMapping("/like")
	public ResponseEntity<String> likeQna(@RequestBody QnaAnswerDto qnaAnswerDto) throws Exception {
		
		Logger.info("likeQnaAnswer - 호출");
		
		if (service.likeQnaAnswer(qnaAnswerDto)!=0) {
			return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL,HttpStatus.NO_CONTENT);
	}
	
	
}
