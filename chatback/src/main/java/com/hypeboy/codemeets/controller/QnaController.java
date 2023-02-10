package com.hypeboy.codemeets.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;

@RestController
@Api(tags = "그룹 내  Q&A API")
@RequestMapping("/api/qna")
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
		
		try {
			service.writeQna(qnaDto);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
            Logger.warn("writeQna fail - " + e); 

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@GetMapping("/list/{groupPk}")
	public ResponseEntity<?> getList(@PathVariable("groupPk") int groupPk,
			@RequestParam("nowPage") int nowPage,
			@RequestParam("items") int items) throws Exception {
		
		try {
			List<QnaDto> qnaDtoList = service.getList(groupPk, (nowPage -1) * items, items);
			
			return new ResponseEntity<List<QnaDto>>(qnaDtoList, HttpStatus.OK);
		} catch (Exception e) {
            Logger.warn("getList fail - " + e);

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/{groupQuestionPk}")
	public ResponseEntity<?> getQna(@PathVariable("groupQuestionPk") int qnaPk, @RequestParam int userPk) throws Exception {
		
		// HttpServletRequest request
		try {
			return new ResponseEntity<QnaDto>(service.getQna(qnaPk, userPk), HttpStatus.OK);
			} catch (Exception e) {
	            Logger.warn("getQna fail - " + e);

	            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
			}
	}
	
	@PutMapping
	public ResponseEntity<String> modifyQna(@RequestBody QnaDto qnaDto) throws Exception {
		
		try {
			service.modifyQna(qnaDto);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
            Logger.warn("modifyQna fail - " + e);

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/{groupQuestionPk}")
	public ResponseEntity<String> deleteQna(@PathVariable("groupQuestionPk")int groupQuestionPk) throws Exception {
		
		try {
			service.deleteQna(groupQuestionPk);
			return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
		}catch (Exception e) {
            Logger.warn("deleteQna fail - " + e);

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/like")
	public ResponseEntity<String> likeQna(@RequestBody QnaDto qnaDto) throws Exception {
		
		try {
			service.likeQna(qnaDto);
			return new ResponseEntity<String>(SUCCESS,HttpStatus.OK);
		}catch (Exception e) {
            Logger.warn("likeQna fail - " + e);

            return new ResponseEntity<String>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
