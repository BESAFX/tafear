package com.besafx.app.service;

import com.besafx.app.entity.Company;
import com.besafx.app.entity.Person;
import com.besafx.app.entity.Region;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface RegionService extends PagingAndSortingRepository<Region, Long>, JpaSpecificationExecutor<Region> {

    Region findTopByOrderByCodeDesc();

    List<Region> findByCompany(Company company);

    List<Region> findByManager(Person manager);

}
