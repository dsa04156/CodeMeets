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

import com.hypeboy.codemeets.model.dto.QnaDto;
import com.hypeboy.codemeets.model.service.QnaService;

import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/qna")
public class QnaController {
	
	private static final Logger Logger = LoggerFactory.getLogger(QnaController.class);
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	private QnaService service;
	
	@Autowired
	public QnaController(QnaService service) {
		super();
		this.service = service;
	}
	
	@PostMapping
	public ResponseEntity<String> writeQna(@RequestBody @ApiParam(value = "qna 정보.", required = true) QnaDto qnaDto) throws Exception {
		
		Logger.info("wirteQna - 호출");
		
		if (service.writeQna(qnaDto) != 0) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} else
			return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/list/{groupPk}")
	public ResponseEntity<?> getList(@PathVariable("groupPk") int groupPk) throws Exception {
		
		System.out.println("qna list hi");
		List<QnaDto> qnaDtoList = service.getList(groupPk);
		
		return new ResponseEntity<List<QnaDto>>(qnaDtoList, HttpStatus.OK);
	}
	
	@GetMapping("/{groupQuestionPk}")
	public ResponseEntity<?> getQna(@PathVariable("groupQuestionPk") int qnaPk, @RequestParam int userPk) throws Exception {
		
		System.out.println("info hi");
		
		return new ResponseEntity<QnaDto>(service.getQna(qnaPk, userPk), HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<String> modifyQna(@RequestBody QnaDto qnaDto) throws Exception {
		
		System.out.println("qna modify");
		
		Logger.info("modifyQna - 호출 {}", qnaDto);
		
		if (service.modifyQna(qnaDto)!=0) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.OK);
	}
	
	@DeleteMapping("/{groupQuestionPk}")
	public ResponseEntity<String> deleteQna(@PathVariable("groupQuestionPk")int groupQuestionPk) throws Exception {
		
		Logger.info("deleteQna - 호출");
		
		if (service.deleteQna(groupQuestionPk)!=0) {
			return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL,HttpStatus.NO_CONTENT);
	}
	
	@PutMapping("/like")
	public ResponseEntity<String> likeQna(@RequestBody QnaDto qnaDto) throws Exception {
		
		Logger.info("likeQna - 호출");
		
		if (service.likeQna(qnaDto)!=0) {
			return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL,HttpStatus.NO_CONTENT);
	}
	
}
